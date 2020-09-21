import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'
import {prettyDOM} from '@testing-library/dom'

test('blog is rendered only partly by default', () =>
{

  const user = {name: 'x'}
  function refresh(x) {return }

  const blog = {
    author: 'Blog Tester',
    title: 'Blog testing',
    url: 'blogtest.com',
    likes: 0,
    id: '123',
    user: user
  }

  const component = render(
    <Blog
      author={blog.author}
      title={blog.title}
      url={blog.url}
      likes={blog.likes}
      user={user}
      id={blog.id}
      refresh={refresh}
    />
  )

  expect(component.container).toHaveTextContent(
    'Blog Tester'
  )
  expect(component.container).toHaveTextContent(
    'Blog testing'
  )
  expect(component.container).not.toHaveTextContent(
    'blogtest.com'
  )
  expect(component.container).not.toHaveValue(
    '0'
  )
})

test('blog is rendered only partly by default', () =>
{

  const user = {name: 'x'}
  function refresh(x) {return }

  const blog = {
    author: 'Blog Tester',
    title: 'Blog testing',
    url: 'blogtest.com',
    likes: 0,
    id: '123',
    user: user
  }

  const component = render(
    <Blog
      author={blog.author}
      title={blog.title}
      url={blog.url}
      likes={blog.likes}
      user={user}
      id={blog.id}
      refresh={refresh}
    />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Blog Tester'
  )
  expect(component.container).toHaveTextContent(
    'Blog testing'
  )
  expect(component.container).toHaveTextContent(
    'blogtest.com'
  )
  expect(component.container).toHaveTextContent(
    'Likes'
  )
})

test('like button can be clicked twice', () =>
{

  const user = {name: 'x'}
  const mockHandler = jest.fn()

  const blog = {
    author: 'Blog Tester',
    title: 'Blog testing',
    url: 'blogtest.com',
    likes: 0,
    id: '123',
    user: user
  }

  const component = render(
    <Blog
      author={blog.author}
      title={blog.title}
      url={blog.url}
      likes={blog.likes}
      user={user}
      id={blog.id}
      refresh={mockHandler}
    />
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)
  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})


