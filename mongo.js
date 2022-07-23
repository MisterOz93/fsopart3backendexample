const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Please provide the mongo password as an argument: node mongo.js <password>');
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://MisterOz93:${password}@cluster0.vediu.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

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

