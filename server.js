//Empty data object.
projectData = {};

//framework requiremenets.
const express = require('express');

//express app instance.
const app = express();

//middleware for parsing json.
const bodyParser = require('body-parser');

//configuring the app to use bodyParser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors for cross origin resource sharing.
const cors = require('cors');

//configuring the app to use cors.
app.use(express.static('website'));
app.use(cors());


//Server Setup.

//port number.
const port = 8080;

//starting the server.
app.listen(port, () => {
    console.log('server Running!');
    console.log(`Listening on port ${port}`);
});

//the GET route for the projectData object.
app.get('/projectData', (req, res) => {
    res.send(projectData);
});

//the POST route for the projectData object.
app.post('/projectData', (req, res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    projectData = req.body;
    res.send(projectData);
});

