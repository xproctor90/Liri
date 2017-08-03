
// declaring command variables
var action = process.argv[2];
// either the name of a song, or movie
var value = process.argv[3];

// switch case for whatever command the user enters
switch(action){
    case 'my-tweets':
        twitter();
    break;

    case 'spotify-this-song':
        spotify();
    break;

    case 'movie-this':
        movie();
    break;

    default:
    break;
}

// Tweet function
function twitter(){

  // npm package
  var Twitter = require('twitter');
  // assigning the keys
  var dataKeys = require("./keys.js");
  // what to search for
  var params = {screen_name: 'xproctor90'};
  //console.log(params);

  // using the npm
  client.get('statuses/user_timeline', params, function(error, tweets) {
    //if error, log it, else log the tweets
    if (error) {
      console.log(error);
    }
    else {
      // for loop to run through the length of my account's tweets
      console.log("\n/////////////////TWEET ME////////////////\n");
      for(i=0; i< tweets.length; i++){
        // adds a number and dot before to show order
        console.log((i+1) + ". " + tweets[i].text);
      }
    }
  });
}

//Spotify function
function spotify() {
  //npm package
  var spotify = require('spotify');

  spotify.search({type: 'track', query: value || 'ace of base the sign'}, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
    //console.log("/////////Data////////")
    //console.log(data);
    //console.log("///////Data.tracks.items///////")
    var spotifyCall = data.tracks.items[0];
    //console.log(spotifyCall);
    //console.log("/////////spotifyCall.artists[0].name////////");

// if no error, show me the information from the API
    console.log("\n////Spotify This////////\n");
    var artist = spotifyCall.artists[0].name;
    console.log("Artist: " + artist);
    var song = spotifyCall.name;
    console.log("Song name: " + song);
    var preview = spotifyCall.preview_url;
    console.log("Preview Link: " + preview);
    var album = spotifyCall.album.name;
    console.log("Album: " + album);

}
});
}

//OMDB FUNCTION
function movie() {
  //npm package
var request = require('request');
// set movie name equal to user input
var movieName = value;
var movieDefault = "Superbad";
// search url variable
var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';

 // if the user entered a title, search that
 if (movieName != null) {
    request(url, function (error, response, body) {
      // If the request is successful
      if (!error && response.statusCode == 200) {
              // Parse the body and pull for each attribute
              console.log("\n/////////////////MOVIE THIS////////////////\n")
              console.log("Title: " + value);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };//end of if
      });//end of request

    // if user doesn't enter a value, value will be set to Mr.Nobody
    } else {
      request(urlDefault, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode == 200) {
              console.log("Title: " + movieDefault);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };//end of if
      });//end of request
    } // end of else
  } // end of movie()
