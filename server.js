// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`server running on localhost ${port}`);
})

//Handle GET Requests
app.get('/all', (req, res) => {
    res.send(projectData);
});

//Handle POST request
app.post('/alldata', (req, res) => {
    const data = req.body;
    projectData["temp"] = data[0].temperature;
    projectData["feel"] = data[1].feeling;
    projectData["date"] = data[2].date;
    res.send(projectData);
});