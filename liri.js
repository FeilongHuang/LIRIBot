require("dotenv").config();
var keys=require("./keys.js");
var axios=require("axios");
var command=process.argv[2];
var querryString=process.argv[3];
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
spotify.search({ type: 'track', query: querryString,limit:1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
var Artists=data.tracks.items[0].artists[0].name;
var TrackName=data.tracks.items[0].name;
var PreviewURL=data.tracks.items[0].preview_url;
var Album=data.tracks.items[0].album.name;
console.log("Artists: "+Artists); 
console.log("Track Name: "+TrackName); 
console.log("Preview Link: "+PreviewURL);
console.log("Album: "+Album);
//console.log(data.tracks.items[0]);
});
axios.get("https://rest.bandsintown.com/artists/" + querryString + "/events?app_id=codingbootcamp").then(function(response){
var venueName=response.data[0].venue.name;
var venueLocation=response.data[0].venue.city;
var date=response.data[0].datetime;
console.log("Venue Name: "+venueName);
console.log("Venue Location: "+venueLocation);
console.log("Date of the Event: "+date);
})