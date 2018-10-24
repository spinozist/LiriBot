require("dotenv").config();

var keys = require(`./keys`);

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var searchInput = process.argv[3];

var action = process.argv[2];

var concertSearch = function(){
    console.log(`Search Concerts for ${searchInput}`);
};

var spotifySearch = function(){
    console.log(`Search Spotify for ${searchInput}`);
    spotify.search({
        available_markets: 'US',
        limit: 2, 
        type: 'track', 
        query: searchInput
     }).then(function(response) {
      console.log(JSON.stringify(response, null, 2));
    }).catch(function(err) {
      console.log(err);
    });
};

var movieSearch = function(){
    console.log(`Movie search for ${searchInput}`);
};

var doItSearch = function(){
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