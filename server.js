'use strict'
//This is our server


// Set up
// ------------------------

require('dotenv').config();
//express server
const express = require('express');
// Allows for cross origin resource sharing 
const cors = require('cors');

//load data
const data = require('./weather.json');


//load API Data  
const axios = require('axios');

const {response} = require('express');

//put relative file path with ./ at the beginning
const getMovies = require('./modules/getMovies.js');
const getForecast = require('./modules/getForecast.js');

//Start our server
const app = express();

// Middleware 
//The app.use() function is used to mount the specified middleware function(s) at the path which is being specified 
app.use(cors());

//Declare our PORT variable
const PORT = process.env.PORT || 3001;

// Listening for connection
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));



//--------------------------
//getForecast.js
app.get('/weather', getForecast);

//getMovies.js
app.get('/movie', getMovies);



// Endpoints:
app.get("/", (req, res) => {
    // sends a response
    res.send("Hello from the home route! again!");
});

// Catch all endpoints

app.get('*', (req, res) => {
    res.status(404).send('Page not Found');
});
