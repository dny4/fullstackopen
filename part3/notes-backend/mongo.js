const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri =
  `mongodb+srv://fullstack:${password}@cluster0.wgbarlg.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(uri)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

//const note = new Note({
//  content: 'You need to drink more waddder',
//  important: true,
//})
//
//note.save().then(result => {
//  console.log('note saved!')
//  console.log(result)
//  mongoose.connection.close()
//})

// fetch form db 

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})


