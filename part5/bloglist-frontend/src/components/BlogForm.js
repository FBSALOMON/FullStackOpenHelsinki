import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newAuthor, setNewAuhor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuhor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: newAuthor,
      title: newTitle,
      url: newUrl
    })

    setNewAuhor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
                title:
        <input
          id='title'
          value={newTitle}
          onChange={handleNewTitle}
        />
      </div>
      <div>
                author:
        <input
          id='author'
          value={newAuthor}
          onChange={handleNewAuthor}
        />
      </div>
      <div>
                url:
        <input
          id='url'
          value={newUrl}
          onChange={handleNewUrl}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm