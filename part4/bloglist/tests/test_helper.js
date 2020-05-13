const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}