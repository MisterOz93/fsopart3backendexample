//practice file to learn mongo basics
require('dotenv').config()

const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
const url = process.env.MONGO_URI

mongoose.connect(url).then((result) => {
  console.log('mongo connected');

 /* const note = new Note({
    content: 'Callback functions suck :(',
    date: new Date(),
    important: false,
  })

  return note.save()
}).then(() => {
  console.log('note saved!')
  return mongoose.connection.close() */
  Note.find({}).then(res => {
    res.forEach(note => console.log(note))
    mongoose.connection.close()
  })
  }).catch((err) => console.log(err)) 

