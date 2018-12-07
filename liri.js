// initiate varibles---------------------------------------------------------------------------------------------------
require("dotenv").config();
var keys=require("./keys.js");
var axios=require("axios");
var moment=require("moment");
var fs=require("fs");
var command=process.argv[2];
var querryString= process.argv.slice(3).join(" ");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// using switch statement to run different command-----------------------------------------------------------------------
switch(command){
    case 'spotify-this-song':
    SpotifyThisSong();
    break;
    case 'concert-this':
    ConcertThis();
    break;
    case 'movie-this':
    MovieThis();
    break;
    case 'do-what-it-says':
    DoWhatItSays();
    break;
}
//function SpotifyThisSong-------------------------------------------------------------------------------------------------
function SpotifyThisSong(){
spotify.search({ type: 'track', query: querryString,limit:1 }, function(err, data) {
  if (err) {

    return console.log('Error occurred: ' + err);
  };
  if(data.tracks.total===0){
      querryString="The Sign%20artist:Ace of Base";
      SpotifyThisSong();
      return;
  }
var Artists=data.tracks.items[0].artists[0].name;
var TrackName=data.tracks.items[0].name;
var PreviewURL=data.tracks.items[0].preview_url;
var Album=data.tracks.items[0].album.name;
console.log("Artists: "+Artists); 
console.log("Track Name: "+TrackName); 
console.log("Preview Link: "+PreviewURL);
console.log("Album: "+Album);
});
};
//function ConcertThis---------------------------------------------------------------------------------------------------
function ConcertThis(){
axios.get("https://rest.bandsintown.com/artists/" + querryString + "/events?app_id=codingbootcamp").then(function(response){
var venueName=response.data[0].venue.name;
var venueLocation=response.data[0].venue.city;
var date=response.data[0].datetime; 
var formatDate=moment(date).format("MM/DD/YYYY");
console.log("Venue Name: "+venueName);
console.log("Venue Location: "+venueLocation);
console.log("Date of the Event: "+formatDate);
});
};
//function MovieThis-------------------------------------------------------------------------------------------------------

function MovieThis(){
if(querryString===""){
    querryString= 'Mr. Nobody.';
}
axios.get("http://www.omdbapi.com/?apikey=1a5d41b0&t="+querryString).then(function(response){
var Title=response.data.Title;
var Year=response.data.Year;
var IMDBRating=response.data.Ratings[0].Value;
var RottenTomatoesRating=response.data.Ratings[1].Value;
var Country=response.data.Country;
var Language=response.data.Language;
var Plot=response.data.Plot;
var Actors=response.data.Actors;
//console.log(response.data.Ratings);
console.log("Title: "+Title);
console.log("Year: "+Year);
console.log("IMDB Rating: "+IMDBRating);
console.log("Rotten Tomatoes Rating: "+RottenTomatoesRating);
console.log("Country: "+Country);
console.log("Language: "+Language);
console.log("Plot: "+Plot);
console.log("Actors: "+ Actors);
});
};
//function DoWhatItSays-----------------------------------------------------------------------------------------------------
function DoWhatItSays(){
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
    return console.log(error);
    }
    var dataArr = data.split(",");
    querryString=dataArr[1];
    switch(dataArr[0]){
        case 'spotify-this-song':
        SpotifyThisSong();
        break;
        case 'concert-this':
        ConcertThis();
        break;
        case 'movie-this':
        MovieThis();
        break;
    }
  });
};
  //---------------------------------------------------------------------
 