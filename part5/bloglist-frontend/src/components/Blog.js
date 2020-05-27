import React, {useState} from 'react'

const Blog = ({ blog, updateLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const update = (event) => {
    updateLike({
      ...blog, 
      user: blog.user.id, 
      likes: blog.likes + 1
    })
}

  return (
    <li style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title} {blog.author}<button onClick={toggleVisibility}>view</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={update}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </li>
  )
}

export default Blog
