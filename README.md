# twitter-sentiment-analysis
A novice's implementation of twitter sentiment analysis with NodeJS (REST API with Sails.js) , MongoDB, Twitter API, sentiment (nodejs tool for sentiment analysis - AFINN based), natural (Nodejs NLP toolkit), AngularJS (frontend)

## How to run
* Obtain Twitter API usage tokens from Twitter API dashboard, set them in config.json
* Create database 'twitter' in MongoDB
* Run `cd twitter && sails lift`
* Run `cd ../frontend && npm install && bower install`
* Run `grunt serve`

##TODO
* Daemon to fetch 100 tweets and saving them whenever allowed.
