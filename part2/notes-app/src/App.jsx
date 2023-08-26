import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Note from './components/Note'
import Footer from './components/Footer'
import './index.css'
  
function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  const handleNoteChange = e => setNewNote(e.target.value)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then( updatedNotes => {
        setNotes(notes.concat(updatedNotes))
        setNewNote('')
      })

  }

  const toggleImportanceOf = (id) => {
    const note = notes.find( n => n.id === id)
    const changeNote = { ...note, important: !note.important }

    noteService
      .update(id, changeNote)
      .then(updatedNote=> {
        setNotes(notes.map(n => n.id !== id ? n : updatedNote))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(
          `the note '${note.content}'was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        
        setNotes(notes.filter(n => n.id != id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notes.map((note) => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Footer/>  
    </div>
  )
}

export default App
