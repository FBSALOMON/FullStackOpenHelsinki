import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification ] = useState(null)
  const [newAuthor, setNewAuhor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith(`Welcome ${user.name}`)
    } catch (exception) {
      notifyWith('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuhor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      const newblog = await blogService.create(blogObject)

      setBlogs(blogs.concat(newblog))
      setNewTitle('')
      setNewAuhor('')
      setNewUrl('')
      notifyWith(`a new blog ${newblog.title} by ${newblog.author} added`)

    } catch (exception) {
      notifyWith('Please check the information again', 'error')
    }
  }

  if (user===null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
          handleLogin={handleLogin} 
        />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <BlogSection  
        user={user} 
        handleLogout={handleLogout} 
        newTitle={newTitle} 
        newAuthor={newAuthor} 
        newUrl={newUrl} 
        handleNewTitle={handleNewTitle} 
        handleNewAuthor={handleNewAuthor} 
        handleNewUrl={handleNewUrl} 
        addBlog={addBlog} 
        blogs={blogs}
      />
    </div>
  )
}

export default App