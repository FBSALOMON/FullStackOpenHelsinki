var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const formattedBlog = (blog) => {
    delete blog._id
    delete blog.url
    delete blog.__v
    return blog ? blog : 0
  }

  return formattedBlog(blogs.reduce((favoriteBlog, nextBlog) => {
    return (favoriteBlog.likes > nextBlog.likes) ? favoriteBlog : nextBlog
  }, 0))
}

const mostBlogs = (blogs) => {
  const authorListByQuantity = _.countBy(blogs, 'author')
  const author = _.maxBy(_.keys(authorListByQuantity), (author) => {
    return authorListByQuantity[author]
  })

  return author ?
    {
      'author': author,
      'blogs': authorListByQuantity[author]
    } : 0
}

const mostLikes = (blogs) => {
  return _.isEmpty(blogs) ? 0 :
    _(blogs).groupBy('author').map((blog, key) => {
      return {
        'author': key,
        'likes': _.sumBy(blog, 'likes')
      }
    }).orderBy('likes').last()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}