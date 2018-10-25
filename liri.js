require("dotenv").config();

// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     var $ = require("jquery")(window);
// });

// var express = require(`express`);

// var app = express();

var keys = require(`./keys`);

var request = require(`request`)

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);



var searchInput = process.argv[3];

var action = process.argv[2];

var concertSearch = function () {
    console.log(`Searching Concerts for ${searchInput}`);

    request('https://rest.bandsintown.com/artists/nicki%20minaj/events?app_id=codingbootcamp', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

    //EXPRESS METHOD
    // app.get(`https://rest.bandsintown.com/artists/nicki%20minaj/events?app_id=codingbootcamp`, function(response){
    //     console.log(response);
    // })

    //JQUERY METHOD
    // $.ajax({
    //     url: `https://rest.bandsintown.com/artists/nicki%20minaj/events?app_id=codingbootcamp`,
    //     method: `GET`
    // }).then(function (response) {
    //     console.log(response);
    // })
};

var spotifySearch = function () {
    console.log(`Searching Spotify for ${searchInput}`);
    spotify.search({
        available_markets: 'US',
        limit: 1,
        type: 'track',
        query: searchInput
    }).then(function (response) {
        console.log(`\n******`);
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].external_urls.spotify);
        console.log(response.tracks.items[0].album.name);
        console.log(`******\n`);
        // console.log(response.tracks.items[0]);
        // console.log(response.tracks.href)
        // console.log(JSON.stringify(response, null, 2));
    }).catch(function (err) {
        console.log(err);
    });
};

var movieSearch = function () {
    console.log(`Movie search for ${searchInput}`);
};

var doItSearch = function () {
    console.log(`${searchInput}`);
};

switch (action) {
    case `concert-this`:
        concertSearch();
        break;

    case `spotify-this-song`:
        spotifySearch();
        break;

    case `movie-this`:
        movieSearch();
        break;

    case `do-what-it-says`:
        doItSearch();
        break;

};