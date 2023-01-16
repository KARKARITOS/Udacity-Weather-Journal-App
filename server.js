// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require("cors");
// Enabling the CORS requests
app.use(cors());

// creating body-parser to allow the backend to access json data sent from client via request.body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// setting up an empty JSON object to become an endpoint for all the routes
projectData = {};

//Initialize the main project folder
app.use(express.static("website"));
//Callback function to make Get '/all'
const getAll = (req,res) => res.status(200).send(projectData);
//GET Route
app.get("/all", getAll);
//Callback function to make Post'/add'
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
//GET route
app.post("/add", postData);
const port = 8000;
const hostname = "127.0.0.1";
//This function to test the server
const listening = () =>
console.log(`This Server runs at http://${hostname}:${port}/`);
//spinning the server
app.listen(port,listening);