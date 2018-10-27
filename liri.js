require("dotenv").config();

//Require definitions

var fs = require(`fs`);

var keys = require(`./keys`);

var request = require(`request`)

var Spotify = require('node-spotify-api');

var moment = require(`moment`);

//Inputs definitions

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

var searchInput = process.argv.slice(3).join(" ");

//Concert Search

function concertSearch() {
    console.log(`Searching Concerts for ${searchInput}`);

    request(`https://rest.bandsintown.com/artists/${searchInput}/events?app_id=codingbootcamp`, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        // console.log('body:', JSON.parse(body,"/"));
        if (!error || response.statusCode === 200) {
            var body = JSON.parse(body);
            body.forEach(e => {
                console.log(`\n********`)
                console.log(e.venue.name);
                console.log(`${e.venue.city}, ${e.venue.country}`);
                console.log(moment(e.datetime).format("MM/DD/YYYY @ ha"));
                console.log(`********\n`);

            })
        } else {
            console.log(error);
        }
    });
};

//Spotify Search

function spotifySearch() {
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
    }).catch(function (err) {
        console.log(err);
    });
};

//Movie Search

function movieSearch() {
    console.log(`Searchig OMDB for ${searchInput}`);
    request(`http://www.omdbapi.com/?apikey=trilogy&t=${searchInput}`, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        // console.log('body:', JSON.parse(body,"/"));
        if (!error || response.statusCode === 200) {
            var body = JSON.parse(body);
            console.log(`\n********`)
            console.log(body.Title);
            console.log(body.Year);
            console.log(`${body.Ratings[0].Value} on IMDB`);
            console.log(`Produced in ${body.Country}`);
            console.log(body.Language);
            console.log(body.Plot);
            console.log(body.Actors);
            console.log(`********\n`)
        } else {
            console.log(error);
        }
    });
};

//Do It Search

function doItSearch() {
    console.log(`${searchInput}`);
    fs.readFile(`random.txt`, `utf8`, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var textArray = data.split(",");
            console.log(textArray);
            console.log(textArray[0]);
            console.log(textArray[1]);
            var action = textArray[0];
            searchInput = textArray[1];
            chooseAction(action);
        }
    });
};

//Choose Action

function chooseAction(action) {
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
}; 

chooseAction(action);