var express = require("express");
const path = require('path');
const { response } = require("express");


//Start the server
var app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// sendFile will go here
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

