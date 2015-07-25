/**
 * Created by vishwajeetv on 25/07/15.
 */
module.exports = {


    analyze: function(tweets) {

        var sentiment = require('sentiment');

        tweets.forEach(function(tweet)
        {
            tweet.sentiment = sentiment(tweet.text);
        });
        return tweets;

    },

    analyzeAll: function(tweets){
        var totalScore = 0;
        var averageScore = 0;
        var numberOfTweets = tweets.length;
        var numberOfSentimentalTweets = 0;
        tweets.forEach(function(tweet)
        {
            if(tweet.sentiment.score != 0) //skiping neutral tweets
            {
                numberOfSentimentalTweets++;
                totalScore = totalScore + tweet.sentiment.score;
            }
        });
        averageScore = totalScore/numberOfSentimentalTweets;
        var analysis = {
            numberOfTweets : numberOfTweets,
            numberOfSentimentalTweets: numberOfSentimentalTweets,
            averageScore : averageScore,
            totalScore : totalScore
        }
        return analysis;
    }


};