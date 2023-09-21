const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  }
  else {
    response.status(404).end()
  }
})


notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// receiving
notesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.id)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: body.id
  })

  const savedNote = await note.save({
    runValidator: true,
    context: 'query'
  })

  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

// modify already existing resourse
notesRouter.post('/:id', async (request, response) => {
  const { content, important } = request.body

  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidator: true, context: 'query' })

  response.json(updatedNote)
})


module.exports = notesRouter



