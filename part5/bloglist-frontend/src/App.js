import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification ] = useState(null)
  const blogFormRef = React.createRef()

  const sortBlogsByLikes = (blogs) => {
    blogs.sort((a,b) => b.likes - a.likes)
    return blogs
  }
  
  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll()
      sortBlogsByLikes(blogs)
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      notifyWith(`Welcome ${user.name}`)
    } catch (exception) {
      notifyWith('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notifyWith(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      notifyWith('Please check the information again', 'error')
    }
  }

  const updateLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.put(blogObject)
      const updatedBlogUser = blogs.find(blog => blog.id === updatedBlog.id).user
      updatedBlog.user = updatedBlogUser
      const blogsToUpdate = blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog)
      sortBlogsByLikes(blogsToUpdate)
      setBlogs(blogsToUpdate)
      notifyWith(`You liked ${updatedBlog.title} by ${updatedBlog.author}!`)
    } catch (exception) {
      notifyWith('Please try again', 'error')
    }
  }

  if (user===null) {
    return (
      <div>
        <Notification notification={notification} />
          <LoginForm 
            userObject={handleLogin} 
          />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <div>
        <h2>blogs</h2>
        <div>
          <p>{user.name} logged in <button onClick={() => handleLogout()}>Logout</button> </p>
        </div>
        <div>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm 
                createBlog={addBlog}
            />
          </Togglable>
        </div>
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateLike={updateLike} />
          )}
      </div>
    </div>
  )
}

export default App