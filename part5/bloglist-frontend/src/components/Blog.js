import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLike, loggedUsername, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none',
    lineHeight: 0
  }

  const blogLikesStyle = {
    display: 'flex',
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const update = () => {
    updateLike({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }

  return (
    <li style={blogStyle}>
      <div style={hideWhenVisible} className='DefaultBlogInformation'>
        <p>{blog.title} {blog.author}<button onClick={toggleVisibility}>view</button></p>
      </div>
      <div style={showWhenVisible} className='FullBlogInformation'>
        <p>{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <div style={blogLikesStyle}>
          <div className='blogLikes'><p>{blog.likes}</p></div>
          <button onClick={update}>like</button>
        </div>
        <p>{blog.user.name}</p>
        {loggedUsername === blog.user.username ? <button onClick={() => deleteBlog(blog)}>remove</button> : ''}
      </div>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  loggedUsername: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
