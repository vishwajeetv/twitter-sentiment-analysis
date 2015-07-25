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
      $scope.averageScore = 0;

        $scope.setSearchText = function(text)
        {
            $scope.searchText = text;
        };


        $scope.search = function()
        {
            var searchText = $scope.searchText;

            TwitterProvider.getTweets(searchText).then(
            function( tweetsData )
            {
              $scope.tweets = tweetsData.tweets;
                $scope.wordAnalysis = tweetsData.wordAnalysis;
              $scope.numberOfTweets = tweetsData.tweets.length;
              var totalScore = 0;
              $scope.tweets.forEach(function(tweet)
              {
                    totalScore = totalScore + tweet.sentiment.score;
              });

              $scope.totalScore = totalScore;
                $scope.averageScore = totalScore/tweetsData.tweets.length;
            }
        )
      }

        $scope.trends = {};
        $scope.getTrends = function(locationId)
        {
            TwitterProvider.getTrends(locationId).then(
                function( trends )
                {
                   $scope.trends = trends;
                    console.log(trends);
                }
            )
        }

      function init()
      {
            //$scope.getTrends(1);
      }

      init();

  });
