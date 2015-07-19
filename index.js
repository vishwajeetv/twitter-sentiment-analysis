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


db.once('open', function (callback) {

    var tweetSchema = mongoose.Schema({
        id : String,
        text: String,
        sentiment : Object
    });

    var Tweets = mongoose.model('Tweet', tweetSchema);

    var params = {screen_name: 'vishwajeetv'};
    var params = { q: 'Eid Mubarak', count: 100};
    var params = { q: '#indvszim', count: 100};
    var params = { q: 'Remove Sushma', count: 100};

    client.get('search/tweets/', params, function(error, tweets, response){
        if (!error) {

            statuses = tweets.statuses;
            console.log(statuses.length);
            statuses.forEach(function(tweet){

                var sentimentAnalyzed = sentiment(tweet.text);

                Tweets.update( {id : tweet.id} , {id: tweet.id, text: tweet.text, sentiment: sentimentAnalyzed},{upsert:true},
                    function()
                    {
                    });
            });
        }
        else{
            console.log(error);
        }
    });



});
