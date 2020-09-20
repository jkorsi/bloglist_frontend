import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogAdd from './BlogAdd'

test('BlogAdd calls handleAddBlog with correct content', () =>
{
  const handleAddBlog = jest.fn()
  const setTitle = jest.fn()
  const setAuthor = jest.fn()
  const setBlogurl = jest.fn()

  const component = render(
    <BlogAdd
      handleAddBlog={handleAddBlog}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setBlogurl={setBlogurl}
      title={''}
      author={''}
      blogUrl={''}
    />
  )

  const title = component.container.querySelector('#title')
  console.log('title', title)
  const author = component.container.querySelector('#author')
  const blogurl = component.container.querySelector('#blogurl')
  const form = component.container.querySelector('#form')

  fireEvent.change(title, {
    target: {value: 'Blogtitle'}
  })
  fireEvent.change(author, {
    target: {value: 'Blog Author'}
  })
  fireEvent.change(blogurl, {
    target: {value: 'www.blogurl.com'}
  })
  fireEvent.submit(form)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(setTitle.mock.calls[0][0]).toBe('Blogtitle')
  expect(setAuthor.mock.calls[0][0]).toBe('Blog Author')
  expect(setBlogurl.mock.calls[0][0]).toBe('www.blogurl.com')
})