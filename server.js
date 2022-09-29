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
app.get('/weather', getForecast);
async function getForecast(req, res) {
    const searchQuery = req.query.searchQuery; 
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;
    try {
        const forecastRes = await axios.get(url);
        const weatherData = forecastRes.data.data.map(weather => new Forecast(weather));
        res.status(200).send(weatherData);
    } catch (error) {
        res.status(500).send(`server error ${error}`);
    }
}

class Forecast {
    constructor(obj){
        this.highTemp = obj.high_temp;
        this.lowTemp = obj.low_temp;
        this.desc = obj.weather.description;
        this.time = obj.valid_date
    }
}



// Endpoints:
app.get("/", (req, res) => {
    // sends a response
    res.send("Hello from the home route! again!");
});

// Catch all endpoints

app.get('*', (req, res) => {
    res.status(404).send('Page not Found');
});
