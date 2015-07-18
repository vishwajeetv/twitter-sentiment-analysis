/**
 * Created by vishwajeetv on 18/07/15.
 */

var Twitter = require('twitter');
var fs = require('fs');
var speak = require("speakeasy-nlp");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitter');

var sentiment = require('sentiment');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var config = require('./config.json');

var client = new Twitter(config);

var params = {screen_name: 'vishwajeetv'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
        console.log(tweets.length);
            tweets.forEach(function(tweet){

            });
    }
});

db.once('open', function (callback) {

    var tweetSchema = mongoose.Schema({
        id : String,
        text: String,
        sentiment : Object
    });

    var Tweets = mongoose.model('Tweet', tweetSchema);

    Tweets.find(function (err, tweets) {
        if (err) return console.error(err);

        tweets.forEach(function(tweet){

            tweet['sentiment'] = sentiment(tweet.text);
            tweet.save();

        })
    })
});
