'use strict';

/**
 * @ngdoc function
 * @name twitterAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twitterAppApp
 */
angular.module('twitterAppApp')
  .controller('MainCtrl', function ($scope, Restangular, TwitterProvider) {

      $scope.tweets = {};
      $scope.positiveCount = 0;
      $scope.negativeCount = 0;
      $scope.totalScore = 0;
      $scope.numberOfTweets = 0;
      $scope.getTweets = function()
      {
        TwitterProvider.getTweets().then(
            function( tweets )
            {
              $scope.tweets = tweets;
              $scope.numberOfTweets = tweets.length;
              var totalScore = 0;
              tweets.forEach(function(tweet)
              {
                totalScore = totalScore + tweet.sentiment.score;
              });
              $scope.totalScore = totalScore;
            }
        )
      }

      function init()
      {
        $scope.getTweets();
      }

      init();

  });
