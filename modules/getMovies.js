'use strict'

//import axios
const axios = require('axios');

// cache object goes here
const cache = require('./cache.js');

async function getMovies(req, res) {
    const searchQuery = req.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`;
    try {
        const key = searchQuery + ' Movie';
        //If the key exist in cache AND is valid, the send THAT data from cache
        if (cache[key] && (Date.now() - cache[key].timeStamp < 4320000)){
            res.status(200).send(cache(key).data);
        }else{
            const movieRes = await axios.get(url);
            const movieData = movieRes.data.results.map(movieC => new MovieC(movieC));
            //save to cache
            cache[key] = {
                timeStamp: Date.now(),
                data: movieData,
            }
            console.log('cache is:', cache);
            res.status(200).send(movieData);
        }
    } catch (error) {
        res.status(500).send(`server error ${error}`)
    }
}

class MovieC {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.vote_average = obj.vote_average;
        this.vote_count = obj.vote_count;
        this.poster_path = 'https://image.tmdb.org/t/p/w500' + obj.poster_path;
        this.popularity = obj.popularity;
        this.release_date = obj.release_date;
    }
}

module.exports = getMovies;