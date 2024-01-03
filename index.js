"use strict";

const express = require('express');
const bodyParser = require("body-parser")
// Create our express app
const app = express();
const port = 3000;
const path = require('path');

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route
const api = require("./routes/api.js");
app.use(api);

// Create a route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create a route to serve the about.html file
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Create a route to serve the press.html file
app.get('/press', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'press.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})