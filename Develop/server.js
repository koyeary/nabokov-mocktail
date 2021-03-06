// Dependencies
const express = require('express');
const path = require('path');
const db = require('../Develop/db/db.json');
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();

// Sets up the Express App
app.use(express.urlencoded({ extended: true }));
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


//Takes in user input as saves note to JSON
app.post('/api/notes', (req, res) => {
  let note = req.body;

  //Generate a timestamp that will act as a unique object "id." This method is less likely to produce duplicate ids than a Math.random generator (without a function that checks for duplicates). Probably not necessary, but let's say someone writes 100,000 notes--it could happen.)
  let id = Number(new Date());
  note.id = id;
  res.json(note);

  //update the JSON
  db.push(note);
  let updateDb = JSON.stringify(db);

  fs.writeFile('../Develop/db/db.json', updateDb, function (err) {
    if (err) throw err;
    console.log("Saved!");
  })
});

//Route that handles delete requests
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
  res.status(404).send(`We can't find a note matching #${noteReq}, or something else went wrong.`);
});

//Starts the server
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});




