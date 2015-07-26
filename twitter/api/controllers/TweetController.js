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

var Twitter = require('twitter');
var client = new Twitter(config);
var Firebase = require("firebase");
var firebaseRef = new Firebase("https://twittersentiment.firebaseio.com/");


module.exports = {

    getAnalyzedTweets: function (request , response )
    {
        var query = request.param('query');

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

                firebaseRef.set(
                    resultToStore
                );

            })
        }

        var getStream = function(){

            client.stream('statuses/filter', {track: query}, function(stream) {
                var tweets = [];
                stream.on('data', function(tweet) {
                    tweets.push(tweet);
                    console.log(tweet.text);
                    if(tweets.length == 3)
                    {
                        saveTweets(tweets);
                        tweets = [];
                    }
                });

                stream.on('error', function(error) {
                    throw error;
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

                    var sentimentalAnalysis =  WordAnalysisService.countSentimentalWords(tweets);
                    var overallAnalysis = SentimentAnalysisService.analyzeAll(tweets);
                    var allWordAnalysis =  WordAnalysisService.countAllWords(tweets);

                    var results = {
                        overallAnalysis : overallAnalysis,
                        sentimentalWordsAnalysis : sentimentalAnalysis,
                        allWordsAnalysis : allWordAnalysis
                    };

                    var resultToStore = {};
                    resultToStore[query] = results;

                    firebaseRef.set(
                        resultToStore
                    );

                    return response.json(results);
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

