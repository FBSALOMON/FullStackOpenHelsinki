import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe ('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'TitleTest',
      author: 'AuthorTest',
      url: 'UrlTest',
      likes: 13,
      user: { name: 'UserTest' }
    }

    const mockLoggedUsername = 'LoggedUser'
    const mockUpdateLike = jest.fn()
    const mockDeleteBlog = jest.fn()

    component = render(
      <Blog blog={blog} updateLike={mockUpdateLike} loggedUsername={mockLoggedUsername} deleteBlog={mockDeleteBlog} />
    )
  })
  test('default contains only author and title', () => {
    const div = component.container.querySelector('.DefaultBlogInformation')
    expect(div).toHaveTextContent('TitleTest AuthorTest')
    expect(div).not.toHaveTextContent('UrlTest')
    expect(div).not.toHaveTextContent('13')
  })

  test('blog\'s url and number of likes are displayed when view button is clicked' , () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.FullBlogInformation')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('UrlTest')
    expect(div).toHaveTextContent('13')
  })
})
