import React from 'react'
import PropTypes from 'prop-types'

const addBlog = ({
  handleAddBlog,
  setTitle,
  setAuthor,
  setBlogurl,
  title,
  author,
  blogUrl
}) =>
{
  return (
<form id='form' onSubmit={handleAddBlog}>
      <h2>Add New Blog</h2>
      <div>
                Title: {' '}
        <input
          id='title'
          type='text'
          value={title}
          name='Title'
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
                Author: {' '}
        <input
          id='author'
          type='text'
          value={author}
          name='Author'
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
                Url: {' '}
        <input
          id='blogurl'
          type='text'
          value={blogUrl}
          name='BlogUrl'
          onChange={({target}) => setBlogurl(target.value)}
        />
      </div>
      <button type='submit'>Create Blog</button>
    </form>
  )
}

addBlog.protoTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setBlogurl: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  blogUrl: PropTypes.string.isRequired
}

export default addBlog