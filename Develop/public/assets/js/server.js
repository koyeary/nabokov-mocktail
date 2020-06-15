const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send(`Welcome to my API!`);
});

app.get('/notes', (req, res) => {
  res.send(`This will be the notes html page`);
});

app.get('/api/notes', (req, res) => {
  res.send(`this will read the db.JSON`);
});

app.post('/api/notes', (req, res) => {
  res.send(`Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.`);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
