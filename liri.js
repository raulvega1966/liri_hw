//Setting my variables.  Each variable does "require" for each API/NPM (and twitter keys)

var Twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');
var keys = require('./keys.js');
var fs = require('fs');

//console.log(keys);
//Keys for twitter
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});


//Takes data input.  Variable Choice is to determine which function to use.
//Varial name takes the name of movie or song.
var choice = process.argv[2];
var name = "";


// This section allows for spaces in the name that is input in node
for (var i = 3; i < process.argv.length; i++) {
    name = name + process.argv[i];
}


//Using swich Statements.  
//A second option would be to use if & else-if.
switch (choice) {
    case "spotify-this":
        console.log("Switch spotify this");
        spotSong();
        break;
    case "twitter":
        console.log("Switch Twitter");
        tuiter();
        break;
    case "movie":
        console.log("Switch OMDB");
        omdbMovie();
        break;
    case "do-what-it-says":
        console.log("do what it says");
        dwis();
        break;
    default:
        console.log("Default case");
        break;
}

//Twitter Programming===================================================================
/*Please note that I do not have 20 tweets.  I am to old to tweet.  
*/

function tuiter() {

    var params = { screen_name: 'raulvega66' };
    //console.log("THIS IS SUPPOSED TO BE TWEETS");

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        //if (error) {console.log(error);}
        if (!error) {
            tweets.forEach(function(tweet) {
                console.log('This tweet was created: ' + tweet.created_at)
                console.log('The tweet by @raulvega66 is: ' + tweet.text)

            })
        }
    });

}



//OMDB Programing=========================================================================
/*I have to change the API used from NMP to a different one.  The one I am using only provides
title, year and imdb.  Due to time constraint, I will not be able to change the API until
later this week.  If I had more time, i would use omdbapi which provides title, year, plot, 
type, tomatoes rating, etc. 
*/

function omdbMovie(movie) {

    if (name === "") {
        console.log("If you have not watched Mr. Nobody, then you should: : http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix");
    }


    omdb.search(name, function(err, movies) {
        if (err) {
            return console.error(err);
        }

        if (movies.length < 1) {
            return console.log('No movies were found!');
        }


        var movieInfo = JSON.stringify(movies);

        movies.forEach(function(movie) {

            //console.log('This is the movie object: ' + movieInfo[0]);

            console.log('Title: ' + movies[0].title);
            console.log('Year: ' + movies[0].year);
            console.log('IMDB: ' + movies[0].imdb);
            console.log('IMDB Rating: ' + movies[0].imdbrating);
            console.log('Country where movie was produced: ' + movies[0].Country);
            console.log('Language of the Movie: ' + movies[0].Language);
            console.log('Plot of the Movie: ' + movies[0].Plot);
            console.log('Actors in the movie: ' + movies[0].Actors);
            console.log('Rotten Tomatoes Rating: ' + movies[0].tomatoRating);
            console.log('Rotten Tomatoes URL: ' + movies[0].tomatoURL);

            //This part appends text of movies to the file random.txt
                  fs.appendFile('random.txt', movies[0].title);
                  fs.appendFile('random.txt', movies[0].year);
                  fs.appendFile('random.txt', movies[0].imdb);
                  fs.appendFile('random.txt', movies[0].imdbrating);
                  fs.appendFile('random.txt', movies[0].Country);
                  fs.appendFile('random.txt', movies[0].Language);
                  fs.appendFile('random.txt', movies[0].Plot);
                  fs.appendFile('random.txt', movies[0].Actors);
                  fs.appendFile('random.txt', movies[0].tomatoRating);
                  fs.appendFile('random.txt', movies[0].tomatoURL);
            
        });
    });
}



//Spotify Programming=====================================================================
function spotSong(song) {
    spotify.search({ type: 'track', query: name || "The Sign Ace of Base" }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        //console.log(song);
        if (data.length < 1) {
            return console.log('No Songs were found!');
        }

        //if(data.tracks.items.length > 0) {

        data.tracks.items.forEach(function(item) {

            //console.log(item);
            console.log('===========   SONG INFO     =========');
            console.log('Artist: ' + item.artists[0].name);
            console.log('Name: ' + item.name);
            console.log('Link: ' + item.preview_url);
            console.log('Album: ' + item.album.name);
            console.log('===========================================');

            //This part appends text of spotify to the file random.txt
                  fs.appendFile('random.txt', item.artists[0].name);
                  fs.appendFile('random.txt', item.name);
                  fs.appendFile('random.txt', item.preview_url);
                  fs.appendFile('random.txt', item.album.name);
            

        });
    });
}



function dwis() {
    fs.readFile('random.txt', "utf8", function(err, data) {
        var iwantitthatway = data.split(',');
        spotSong(iwantitthatway[1]);
    });
}
