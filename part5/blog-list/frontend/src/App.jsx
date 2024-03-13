import { useState, useRef } from 'react'
import loginService from './services/login'
import blogsService from './services/blogsService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import './App.css'


function App() {

  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)


  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notify = (message, isError = false) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => setMessage(''), 3000)
  }

  useState(async () => {
    const loggedUser = window.localStorage.getItem('userLoginInfo')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogsService.setToken(user.token)
      setUser(user)

    }
    const usersBlogs = await blogsService.getAll()
    setBlogs(usersBlogs)
    notify('feed refreshed')

  }, [])

  const handleSingUp = async (event) => {
    event.preventDefault()
    try {
      console.log(name, username, password)
      setName('')
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', true)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogsService.setToken(user.token)
      window.localStorage.setItem('userLoginInfo', JSON.stringify(user))
      setUser(user)
      notify(`Logged in as ${username}`)

      setUsername('')
      setPassword('')

      const usersBlogs = await blogsService.getAll()
      setBlogs(usersBlogs)

    } catch (exception) {
      notify('wrong username or password', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('userLoginInfo')
    setUser(null)
    notify(`${username} logged out`)
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()

    try {
      const savedBlog = await blogsService
        .createBlog(newBlog)

      setBlogs(blogs.concat(savedBlog))
      notify(`new blog '${savedBlog.title}' by '${savedBlog.author}' saved!`, false)

    } catch (exception) {
      notify('provide all the fields', true)
      console.log(exception)
    }
  }

  const updateBlog = async (update) => {
    try {
      const result = await blogsService.updateBlog(update)
      setBlogs(blogs.filter(b => b.id !== result.id)
        .concat(result))
    } catch (exception) {
      notify(exception.message, true)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      const result = await blogsService.deleteBlog(blogId)
      setBlogs(blogs.filter(b => b.id !== result.id))
    } catch (exception) {
      notify(exception.message)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>blog list app</h1>
      <Notification message={message} isError={isError} />
      {!user && <Togglable buttonLabel='Login'>
        < LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} />
      </Togglable>
      }
      {!user && <Togglable buttonLabel='Sign Up'>
        < SignUpForm
          handleSignUp={handleSingUp}
          name={name}
          setName={setName}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} />
      </Togglable>
      }



      {user &&
        <div>
          <p>{user.username} is logged {}
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
        </div>
      }
      <BlogList
        blogs={blogs.sort((a, b) => b.likes - a.likes)}
        handleBlogUpdate={updateBlog}
        handleBlogRemove={removeBlog} />
    </div>
  )
}

export default App
