/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var config = {
    "consumer_key": sails.config.consumer_key,
    "consumer_secret": sails.config.consumer_secret,
    "access_token_key" : sails.config.access_token_key,
    "access_token_secret" : sails.config.access_token_secret
};

var firebase = require('firebase');
var app = firebase.initializeApp({
  apiKey: "AIzaSyAhMcdSRJ_g7JUX3nQooeMEZhJWDoHlxpI",
  authDomain: "test-4073a.firebaseapp.com",
  databaseURL: "https://test-4073a.firebaseio.com",
  projectId: "test-4073a",
  storageBucket: "test-4073a.appspot.com",
  messagingSenderId: "273815567429"
});

var Twitter = require('twitter');
var client = new Twitter(config);
var Firebase = require("firebase");
var firebaseRef =  firebase.database().ref().child("data");


module.exports = {

    getAnalyzedTweets: function (request , response )
    {
        var query = encodeURIComponent(request.param('query'));
        console.log(query);

        var hasTweetsInDB = false;
        var tweets = Tweet.find({'query':query},function(error, tweets) {
        console.log(tweets.length);
            if(tweets.length >= 1)
            {
                hasTweetsInDB = true;
                getTweets();
                getStream();
                processTweetsFromDB()
            }
            else
            {
                getStream();
                getTweets();
            }
        });

        function processTweetsFromDB() {
            Tweet.find({'query': query}, function (error, tweets) {
                var sentimentalAnalysis = WordAnalysisService.countSentimentalWords(tweets);
                var overallAnalysis = SentimentAnalysisService.analyzeAll(tweets);
                var allWordAnalysis = WordAnalysisService.countAllWords(tweets);

                var results = {
                    overallAnalysis: overallAnalysis,
                    sentimentalWordsAnalysis: sentimentalAnalysis,
                    allWordsAnalysis: allWordAnalysis
                };

                var resultToStore = {};
                 resultToStore[query] = results;

                firebaseRef.update(
                    resultToStore
                );

            })
        }

        var getStream = function(){

            client.stream('statuses/filter', {track: query}, function(stream) {
                var tweets = [];
                stream.on('data', function(tweet) {
                    tweets.push(tweet);
                    if(tweets.length == 2)
                    {
                        saveTweets(tweets);
                        tweets = [];
                    }
                });

                stream.on('error', function(error) {
                    console.log(error);
                });
            });

            var saveTweets = function(tweets){
                tweets = SentimentAnalysisService.analyze(tweets);
                tweets.forEach(function(tweet){
                    tweet.query = query;
                    Tweet.findOrCreate({id:tweet.id}, tweet).exec(function createFindCB(err, record){

                    });

                });
                processTweetsFromDB();
            }
            };
        var getTweets = function () {
            TwitterService.getTweets(query).then(function(tweets){

                tweets = SentimentAnalysisService.analyze(tweets);
                tweets.forEach(function(tweet){
                    tweet.query = query;
                    Tweet.findOrCreate({id:tweet.id}, tweet).exec(function createFindCB(err, record){

                    });

                });
                if(hasTweetsInDB == false) {
                    processTweetsFromDB()
                    return response.json({'status':'ok'});
                }
            });
        }


    },

    getTrends : function( request , response )
    {
        var locationId = request.param('location');
        TwitterService.getTrends(locationId).then(function(trends) {
           return response.json({
               trends: trends
           });
       },
        function(error)
        {
            return response.json({
                error: error
            });
        })
    },


};

