# twitter-sentiment-analysis
A novice's implementation of twitter sentiment analysis with NodeJS (REST API with Sails.js) , MongoDB + Mongoose, Twitter API, sentiment (AFINN based), AngularJS (frontend)

## How to run
* Create database 'twitter' in MongoDB
* Run `node index.js`
* Run `cd twitter && sails lift`
* Run `cd ../frontend && npm install && bower install`
* Run `grunt serve`

##TODO
* Moving tweets retrieval and analyzing code to Sails app
* Dynamic interface and API.
* Daemon to fetch 100 tweets and saving them whenever allowed.
