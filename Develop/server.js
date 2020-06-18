// Dependencies
const express = require('express');
const path = require('path');
const db = require('../Develop/db/db.json');
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();

// Sets up the Express App
app.use(express.urlencoded({ extended: true })); //handles data parsing
app.use(express.static(__dirname + '/public'));
app.use(express.json());

//Route that sends the user to the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
});


//Route that sends user to the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/notes.html'))
});


//Displays all the notes
app.get('/api/notes', (req, res) => {
  return res.json(db);
});


//Creates new notes, takes in JSON input
app.post('/api/notes', (req, res) => {
  let newNote = req.body;

  res.json(newNote);
  db.push(newNote);
  let updateDb = JSON.stringify(db);

  fs.writeFile('../Develop/db/db.json', updateDb, function (err) {
    if (err) throw err;
    console.log("Saved!");
  })
});

app.get('/api/notes/:id', (req, res) => {
  const noteReq = parseInt(req.params.id);
  console.log(noteReq);
  for (var note of db) {
    if (note.id === noteReq) {
      return res.send(note);
    }
  }
  res.status(404).send(`Sorry, we can't find a note matching ID #${noteReq}`);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteReq = parseInt(req.params.id);

  for (const [i, note] of db.entries()) {
    if (note.id === noteReq) {
      db.splice(i, 1);
      let updateDb = JSON.stringify(db);
      fs.writeFile('../Develop/db/db.json', updateDb, function (err) {
        if (err) throw err;
        console.log("Saved!");
      })
      return res.send(db);
    }

  }
  res.status(404).send(`Sorry, we can't find a note matching ID #${noteReq}`);
});

//Starts the server
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

