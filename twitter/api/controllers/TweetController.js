/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
                var sentimentalAnalysis =  WordAnalysisService.countSentimentalWords(tweets);
                var overallAnalysis = SentimentAnalysisService.analyzeAll(tweets);
                return response.json({
                    overallAnalysis : overallAnalysis,
                    sentimentalWordsAnalysis : sentimentalAnalysis,
                    allWordsAnalysis : WordAnalysisService.countAllWords(tweets)
                });
            }
            else
            {
                getTweets();
            }
        });

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
                    return response.json({
                        overallAnalysis : overallAnalysis,
                        sentimentalWordsAnalysis : sentimentalAnalysis,
                        allWordsAnalysis : WordAnalysisService.countAllWords(tweets)
                    });
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

