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


        $scope.sentiment = null;
        $scope.search = function()
        {
            var searchText = $scope.searchText;

            TwitterProvider.getTweets(searchText).then(
            function( tweetsData )
            {
                $scope.sentimentalWordsAnalysis = tweetsData.sentimentalWordsAnalysis;
                $scope.allWordsAnalysis = tweetsData.allWordsAnalysis;
                $scope.numberOfTweets = tweetsData.overallAnalysis.numberOfTweets;
                $scope.totalScore = tweetsData.overallAnalysis.totalScore;
                $scope.averageScore = tweetsData.overallAnalysis.averageScore;
                $scope.numberOfSentimentalTweets = tweetsData.overallAnalysis.numberOfSentimentalTweets;

                var averageScore = $scope.averageScore;
                $scope.sentiment = calculateSentiment(averageScore);

            }
        )
      }

        function calculateSentiment(averageScore)
        {
            var sentiment = null;
            var minimumSentimentIndex = 0.1
            var highSentimentIndex = 0.80;
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

        $scope.getSentimentClass = function()
        {
            if(($scope.sentiment == 'Positive') || ($scope.sentiment == 'Very Positive'))
            {
                return 'fa text-success fa-5x fa-smile-o'
            }
            else if(($scope.sentiment == 'Positive') || ($scope.sentiment == 'Very Positive'))
            {
                return 'fa text-danger fa-5x fa-frown-o'
            }
            else
            {
                return 'fa text-warning fa-5x fa-meh-o'
            }
        }
      function init()
      {
            //$scope.getTrends(1);
      }

      init();

  });
