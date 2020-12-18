const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;
const log = console.log;

const app = express();
app.use(express.static(path.join(__dirname, 'pub')));

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'pub', 'html', 'index.html'));
});


app.get("/examples", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'pub','html', 'examples.html'));
});

app.get("/api", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'pub','html', 'api.html'));
});

app.get("/getting-started", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'pub','html', 'gettingStarted.html'));
});



app.listen(PORT, () => {
    log(`Listening on port ${PORT}`);
});