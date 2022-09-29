'use strict'

//import axios
const axios = require('axios');

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
    constructor(obj) {
        this.highTemp = obj.high_temp;
        this.lowTemp = obj.low_temp;
        this.desc = obj.weather.description;
        this.time = obj.valid_date
    }
}

//node export syntax
module.exports = getForecast;