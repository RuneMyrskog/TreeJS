const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;
const log = console.log;

const app = express();

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, () => {
    log(`Listening on port ${PORT}`);
});