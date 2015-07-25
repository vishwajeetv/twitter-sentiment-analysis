/**
* Tweet.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id : { type: 'string'},
    text: { type:'string' },
    sentiment: { type: 'json' },
    query: { type: 'text' }
  },
    tableName : "tweets"
};

