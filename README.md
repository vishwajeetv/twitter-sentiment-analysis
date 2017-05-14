# twitter-sentiment-analysis

A novice's implementation of real-time twitter sentiment analysis.

A working, live demo is available here: http://vishwajeetv.com/twitter

Here's an informal blog post explaining how this is built : http://www.vishwajeetv.com/how-did-i-built-real-time-twitter-sentiment-analyser/

Demo Video - https://youtu.be/YEaFMTN4BlU

Built with:
* NodeJS (REST API with Sails.js)
* MongoDB
* Twitter API
* sentiment (nodejs tool for sentiment analysis - AFINN based)
* natural (Nodejs NLP toolkit)
* AngularJS (frontend)
* Firebase (real-time data storage / updation PaaS), AngularFire

## How to run
* Obtain Twitter API usage tokens from Twitter API dashboard, set them in config.json
* Create database 'twitter' in MongoDB
* Run `cd twitter && sails lift`
* Run `cd ../frontend && npm install && bower install`
* Run `grunt serve`

## TODO
* Daemon to fetch 100 tweets and saving them whenever allowed.

### Notes
* For production setup, do this `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
* To install sails, use this `sudo npm install --unsafe-perm --verbose -g sails`
* To start the production server, use `forever start app.js --prod`
