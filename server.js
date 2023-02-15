const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


// GET and POST request

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), (err,data) => {
        if(err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});



// HTML routes for notes.html and index.html

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});



app.listen(PORT, () =>
  console.log(`Listening for requests on port ${PORT}! 🏎️`)
);