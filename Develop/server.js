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

/* app.get('api/notes/:note', (req, res) => {
  const noteReq = req.params.note;

  //console.log(noteReq);

  for (let i = 0; i < notes.length; i++) {
    if (noteReq === db[i].routeName) {
      return res.json(db[i]);
    }
    return res.json(false);
  } 
})
 */
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
  //res.end();
/*   for (var i = 0; i < db.length; i++) {
     if (noteReq === db[i].id) {
       return console.log(db[i]);
        res.send(db[i]);
      return res.json(db[i]); 
      
    }
    res.send(db[i]); 
  } */
 // res.status(404).send(`Sorry, we can't find that!`);  




//Starts the server
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

