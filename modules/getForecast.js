'use strict'

//import axios
const axios = require('axios');

// cache object goes here
const cache = require('./cache.js');

async function getForecast(req, res) {
    const searchQuery = req.query.searchQuery;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;
    try {
        const key = searchQuery + ' Weather';
        // If the key exist in cache AND is valid, then send THAT data from cache
        if (cache[key] && (Date.now() - cache[key].timeStamp <  14400000)){
            res.status(200).send(cache(key).data);
        }else{
            const forecastRes = await axios.get(url);
            const weatherData = forecastRes.data.data.map(weather => new Forecast(weather));
            //save to cache
            cache[key]= {
                timeStamp: Date.now(),
                data: weatherData,
            }
            console.log('cache is:', cache);
            res.status(200).send(weatherData);
        }
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