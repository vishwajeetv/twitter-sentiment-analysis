/**
 * Created by vishwajeetv on 25/07/15.
 */


function calculateSentiment(averageScore)
{
    var sentiment = null;
    var minimumSentimentIndex = 0.5;
    var highSentimentIndex = 2;
    if(averageScore > minimumSentimentIndex){
        sentiment = 'Positive';
        if(averageScore > highSentimentIndex)
        {
            sentiment = 'Very Positive';
        }
    }
    else if( averageScore < -minimumSentimentIndex){
        sentiment = 'Negative';
        if(averageScore < -highSentimentIndex)
        {
            sentiment = 'Very Negative';
        }
    }
    else
    {
        sentiment = 'Neutral';
    }
    return sentiment;
}

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

module.exports = {


    analyze: function(tweets) {

        var favouriteScoreModifier = 10; //number by which favourite count should be divided.
        tweets.forEach(function(tweet)
        {
            if(tweet && tweet.text){
              tweet.sentiment = sentiment.analyze(tweet.text);

              if(tweet.sentiment && tweet.favorite_count && tweet.favorite_count > 0)
              {
                tweet.sentiment.score = (tweet.sentiment.score +
                  ((tweet.sentiment.score * tweet.favorite_count)/favouriteScoreModifier));
              }
            }

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
            if(tweet && tweet.sentiment && tweet.sentiment.score != 0) //skiping neutral tweets
            {
                numberOfSentimentalTweets++;
                totalScore = parseInt(totalScore + tweet.sentiment.score);
            }
        });

        if(numberOfSentimentalTweets != 0){
            averageScore = parseFloat(totalScore/numberOfSentimentalTweets);
        }

        var analysis = {
            numberOfTweets : numberOfTweets,
            numberOfSentimentalTweets: numberOfSentimentalTweets,
            averageScore : averageScore,
            totalScore : totalScore,
            sentiment : calculateSentiment(averageScore)
        };

        return analysis;
    }


};
