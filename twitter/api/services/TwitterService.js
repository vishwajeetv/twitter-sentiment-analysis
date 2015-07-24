/**
 * Created by vishwajeetv on 25/07/15.
 */

module.exports = {


    getTweets: function(searchText) {

        var Promise = require('bluebird');

        var config = {
            "consumer_key": sails.config.consumer_key,
            "consumer_secret": sails.config.consumer_secret,
            "access_token_key" : sails.config.access_token_key,
            "access_token_secret" : sails.config.access_token_secret
        };

        var Twitter = require('twitter');
        var client = new Twitter(config);
        
        //var params = { q: '#indvszim', count: 100};
        var params = { q: searchText, count: 100};

        var tweets;

        return new Promise( function( resolve, reject )
        {
            client.get('search/tweets/', params, function(error, tweets, response){
                if (!error) {
                    var statuses = tweets.statuses;
                    return resolve(statuses);
                }
                else{
                    console.log(error);
                }
            })
        });





    }
};