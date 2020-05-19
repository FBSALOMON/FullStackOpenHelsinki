const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const newUser = {
      username: 'testUser',
      name: 'dummy',
      password: 'testPassword',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newUserId = response.body.id

    const newUserLogin = {
      username: 'testUser',
      password: 'testPassword'
    }

    const login = await api
      .post('/api/login')
      .send(newUserLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    helper.token = login.body.token

    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: newUserId }))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('Drunkard\'s Walk: How Randomness Rules Our Lives')
  })

  describe('view a specific blog', () => {
    test('unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })

    test('test that verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
      const newBlog = {
        title: 'The Intelligent Investor',
        author: 'Benjamin Graham',
        url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${helper.token}`)
        .send(newBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBeDefined()
      expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
    })

    test('if the title and url are missing, responds with the status code 400 Bad Request', async () => {
      const newBlog = {
        author: 'Benjamin Graham',
        likes: 1233
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${helper.token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with staus code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${helper.token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(blog => blog.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('updating the number of likes of a blog', () => {
    test('succeeds updating blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes += 1

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})