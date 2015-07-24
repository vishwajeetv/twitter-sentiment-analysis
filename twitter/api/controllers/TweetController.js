/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getAnalyzedTweets: function (req, res) {

       tweets =  TwitterService.getTweets( req.param('search')).then(function(tweets){
           return res.json({
               tweets : SentimentAnalysisService.analyze(tweets)
           });
       });

    }

};

