import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogSection = ({user, handleLogout, newTitle, newAuthor, newUrl, handleNewTitle, handleNewAuthor, handleNewUrl, addBlog, blogs}) => {
    return (
        <div>
            <h2>blogs</h2>
            <div>
                <p>{user.name} logged in <button onClick={() => handleLogout()}>Logout</button> </p>
            </div>
            <div>
                <BlogForm 
                    newTitle={newTitle} 
                    newAuthor={newAuthor} 
                    newUrl={newUrl} 
                    handleNewTitle={handleNewTitle} 
                    handleNewAuthor={handleNewAuthor} 
                    handleNewUrl={handleNewUrl} 
                    addBlog={addBlog}
                />
            </div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
      </div>
    )
}

export default BlogSection