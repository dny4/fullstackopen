import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import Note from './components/Note'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import './index.css'

function App() {

  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notes, setNotes] = useState([])

  const setInitialNotes = async () => {
    const usersNotes = await noteService
      .getAll()
    setNotes(usersNotes)
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)

      setInitialNotes()

    }
  }, [])

  const notify = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => setMessage(null), 5000)
  }

  const noteFormRef = useRef()

  const noteForm = () => {
    return (
      <Togglable buttonLabel='New note' ref={noteFormRef}>
        <NoteForm createNote={createNote} />
      </Togglable>
    )
  }

  const createNote = (newNote) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(newNote)
      .then(updatedNotes => {
        setNotes(notes.concat(updatedNotes))
      })
    notify('new note created', false)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify(`${user.username} logged in`, false)

      setInitialNotes()
    } catch (exception) {
      notify('Wrong credentials', true)
    }
  }


  const toggleImportanceOf = async (note) => {
    try {
      const updatedNote = await noteService
        .update(note.id, {
          ...note,
          important: !note.important
        })

      setNotes(
        notes
          .filter(n => n.id !== note.id ? true : false)
          .concat(updatedNote)
      )
    } catch (exception) {
      console.log(exception.message)
      setNotes(
        notes.filter(n => n.id !== note.id ? 1 : 0)
      )
      notify('That note was already removed', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
    notify(`Logged out ${username}`, false)
    setUsername('')
    setPassword('')
    setNotes([])
    setMessage(null)
  }


  return (
    <div className='mx-10 my-2 rounded-md
      border-4 border-solid border-green-800 p-8 shadow-lg'>
      <h1 className=' p-1 text-3xl font-bold text-green-800'>Notes</h1>

      <Notification message={message} isError={isError} />

      {!user
        ? <Togglable
          buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
        : <div className='flex'>
          <div className='m-2 rounded-md bg-gray-300 p-1'>
            <div className='inline-block text-green-800 font-bold'>
              {user.name}
            </div> is logged in
          </div>

          <button
            className='m-2 rounded-md border-2 border-solid border-green-800 p-1 hover:bg-green-800 hover:text-white'
            onClick={handleLogout}
          >log out</button>
        </div>
      }

      {
        user && <div>
          {noteForm()}
        </div>
      }

      <h2
        className='m-2 p-1 font-bold'
      >Notes</h2>
      <div>
        {notes.map((note) =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note)}
          />
        )}
      </div>

      <Footer />
    </div >
  )
}

export default App
