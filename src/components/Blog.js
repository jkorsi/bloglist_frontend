import React, {useState} from 'react'
import {put, remove} from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({
  refresh,
  url,
  title,
  author,
  likes,
  user,
  id}) =>
{
  Blog.propTypes = {
    refresh: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }

  const [infoView, setInfoView] = useState(false)
  const [likeState, setLikes] = useState(likes)
  const [deleted, setDelete] = useState(false)

  const handleLike = async (event) =>
  {
    refresh()
    event.preventDefault()
    const newLikes = likeState + 1
    const newBlog = {
      user: user.div,
      likes: newLikes,
      author: author,
      title: title,
      url: url,
      id: id
    }
    await put(newBlog)
    setLikes(newLikes)
  }

  const handleDelete = async (event) =>
  {
    console.log(title)
    if (window.confirm('Are you sure you want to delete blog: ' + title))
    {
      event.preventDefault()
      setDelete(true)
      console.log('delete...')
      await remove(id)
      console.log('deleted...')
    }
  }

  const blogStyle = {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 7,
  }

  if (!infoView)
  {
    return (
      <div style={blogStyle} className='blog' id='blog'>
        <div onClick={() => setInfoView(!infoView)}>
          Blog: {title}, Author: {author} {}
          <button onClick={() => setInfoView(!infoView)}>View</button>
        </div>
      </div>
    )
  }
  if (deleted)
  {
    return ('')
  }
  return (
    <div style={blogStyle} className='blog' id='blog'>
      <div onClick={() => setInfoView(!infoView)}>
        Blog: {title}, Author: {author} {}
        <button onClick={() => setInfoView(!infoView)}>View</button>
      </div>
      <div>
        Url: {url}
      </div>
      <div id='likes'>
        Likes: {likeState} {}
        <button type='button' onClick={handleLike} style={{color: 'green'}} id='like'> Like </button>
      </div >
      <div>
        User: {user.name}
      </div >
      <button type='button' onClick={handleDelete} style={{color: 'red'}} id='delete'>Delete</button>
    </div>
  )
}

export default Blog
