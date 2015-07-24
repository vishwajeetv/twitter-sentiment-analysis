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

    }
};