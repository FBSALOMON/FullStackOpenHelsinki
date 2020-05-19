const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
    likes: 13
  },
  {
    title: 'Drunkard\'s Walk: How Randomness Rules Our Lives',
    author: 'Leonard Mlodinow',
    url: 'https://en.wikipedia.org/wiki/The_Drunkard%27s_Walk',
    likes: 10
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const token = ''

module.exports = {
  initialBlogs, blogsInDb, usersInDb, token
}