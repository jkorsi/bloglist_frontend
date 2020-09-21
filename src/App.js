import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import BlogAdd from './components/BlogAdd'
import Notification from './components/Notification'
import {getAll, setToken, create} from './services/blogs'
import loginService from './services/login'

const App = () =>
{
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogurl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogAddVisible, setBlogAddVisibility] = useState(false)

  // Error message red for errors, and green for success
  const [isSuccess, setSuccess] = useState(true)

  useEffect(() =>
  {
    async function getBlogs()
    {
      const blogs = await getAll()
      setBlogs(blogs.sort(compareLikes))
    }
    console.log('Use effect!')
    getBlogs()
  }, [])

  function compareLikes(a, b)
  {
    //Sort descending
    return b.likes - a.likes
  }

  useEffect(() =>
  {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)

    }
  }, [])

  const handleLogin = async (event) =>
  {
    event.preventDefault()
    try
    {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      setUser(user)
      setToken(user.token)

      setUsername('')
      setPassword('')

      setSuccess(true)
      throwMessage('Login was succesful')
    } catch (exception)
    {
      setSuccess(false)
      throwMessage('Login was not succesful')
    }
  }

  const handleLogout = async (event) =>
  {
    event.preventDefault()
    try
    {
      window.localStorage.clear()

      setUser(null)
      setUsername('')
      setPassword('')

      setSuccess(true)
      throwMessage('Logout was succesful')

    } catch (exception)
    {
      setSuccess(false)
      throwMessage('Logout was not succesful')
    }
  }

  const handleAddBlog = async (event) =>
  {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: blogUrl,
      user: user.name,
      likes: 0
    }

    const response = await create(blogObject)
    blogObject.id = response.id
    blogObject.user = response.user
    setTitle('')
    setAuthor('')
    setBlogurl('')

    setBlogs(blogs.concat(blogObject).sort(compareLikes))
    setSuccess(true)

    blogs.sort(compareLikes)

    throwMessage(`New blog added. Blog: ${blogObject.title}, Author: ${blogObject.author}`)
  }

  function throwMessage(errorMsg)
  {
    setErrorMessage(
      (`${errorMsg}`)
    )
    setTimeout(() =>
    {
      setErrorMessage(null)
    }, 5000)
  }

  function refresh()
  {
    setBlogs(blogs.sort(compareLikes))
  }
  const addBlogForm = () =>
  {
    const hideWhenVisible = {display: blogAddVisible ? 'none' : ''}
    const showWhenVisible = {display: blogAddVisible ? '' : 'none'}

    return (
      <div>
        < div style={hideWhenVisible} >
          <button onClick={() => setBlogAddVisibility(true)}>Open Blog Form</button>
        </div >
        <div style={showWhenVisible}>
          <button onClick={() => setBlogAddVisibility(false)}>Close Form</button>
          <BlogAdd
            handleAddBlog={handleAddBlog}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setBlogurl={setBlogurl}
            title={title}
            author={author}
            blogUrl={blogUrl}
          />
        </div>
      </div>
    )
  }

  if (user === null)
  {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <h2>Blogs Log In</h2>
          <Notification
            message={errorMessage}
            isSuccess={isSuccess}
          />
          <div>
            Username
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type='submit' id='login'>Log In</button>
        </form>
      </div>
    )
  }
  return (
    <div style={{whiteSpace: 'pre-wrap'}}>
      <div id='blogs'>
        <h2>Blogs</h2>
        <Notification
          message={errorMessage}
          isSuccess={isSuccess}
        />
        Logged in as: {user.name}  {'\n'}

        <button type='button' onClick={handleLogout}>Log Out</button>
        {'\n'}{'\n'}
        {blogs.map(blog =>
          <Blog key={blog.id}
            refresh={refresh}
            url={blog.url}
            title={blog.title}
            author={blog.author}
            likes={blog.likes}
            user={blog.user}
            id={blog.id}
          />
        )}
        {'\n'}
      </div>
      {addBlogForm()}
    </div>
  )
}

export default App