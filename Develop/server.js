// Dependencies
const express = require('express');
const path = require('path');
const db = require('../Develop/db/db.json');
const fs = require('fs');

const port = process.env.PORT || 8080; 
const app = express(); 

// Set us up the Express App
app.use(express.urlencoded({ extended: true })); // Sets up the Express app to handle data parsing
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

app.get('api/notes/:note', (req, res) => {
  const noteReq = req.params.note;

  //console.log(noteReq);

  for (let i = 0; i < notes.length; i++) {
    if (noteReq === db[i].routeName) {
      return res.json(db[i]);
    }
    return res.json(false);
  }
})

//Creates new notes, takes in JSON input
app.post('/api/notes', (req, res) => {
  let newNote = req.body;

/*   // Using a RegEx Pattern to remove spaces from newNote
   newNote.title = newNote.title.replace(/\s+/g, '').toLowerCase(); */
 
  res.json(newNote);
  db.push(newNote);
  let updateDb = JSON.stringify(db);
  
   fs.writeFile('../Develop/db/db.json', updateDb, function (err) {
    if (err) throw err;
    console.log("Saved!");
  })  
});
 
//Starts the server
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

