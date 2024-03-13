import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div className="formDiv">
      <form
        onSubmit={addNote}>
        < input
          className='m-2 rounded-md border-2 border-solid border-green-800 p-1'
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          placeholder='write note content here'
        />
        < button
          className='m-2 rounded-md border-2 border-solid border-green-800 p-1 hover:bg-green-800 hover:text-white'
          type='submit' > save</button >
      </form >
    </div>
  )
}

export default NoteForm
