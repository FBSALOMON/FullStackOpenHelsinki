import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe ('<BlogForm />', () => {
  let component
  let createBlog
  beforeEach(() => {
    createBlog = jest.fn()
    component = render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('form calls the event handler it received as props with the right details when a new blog is called', () => {
    const form = component.container.querySelector('form')
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, {
      target: { value: 'newAuthor' }
    })
    fireEvent.change(title, {
      target: { value: 'newTitle' }
    })
    fireEvent.change(url, {
      target: { value: 'newUrl' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('newAuthor')
    expect(createBlog.mock.calls[0][0].title).toBe('newTitle')
    expect(createBlog.mock.calls[0][0].url).toBe('newUrl')

  })
})