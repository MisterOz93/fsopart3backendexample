//before continuing in FSO, change the POST route to work w/ DB

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const { response } = require('express')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('----')
  next()
}

app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  note ? res.json(note) : res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {

  if (!req.body.content){
    return res.status(400).json({
      error: 'content missing'}
      )
  }

  const note = new Note({
    content: req.body.content,
    important: req.body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))