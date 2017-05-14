'use strict';

/**
 * @ngdoc function
 * @name twitterAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twitterAppApp
 */
angular.module('twitterAppApp')
  .controller('MainCtrl', function ($scope, Restangular, TwitterProvider, $firebaseObject, toaster) {

        var ref = firebase.database().ref().child("data");
        var syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope, "tweetsData");
      $scope.tweets = {};
      $scope.positiveCount = 0;
      $scope.negativeCount = 0;
      $scope.totalScore = 0;
      $scope.numberOfTweets = 0;
      $scope.averageScore = 0;

        $scope.setSearchText = function(text)
        {
            console.log(text);
            $scope.searchText = (text);
        };


        $scope.sentiment = null;
        $scope.search = function()
        {
            if( ($scope.searchText == undefined) || ($scope.searchText == ''))
            {
                toaster.pop('error', "No Search Query", "Please enter the search query");
            }
            else
            {

                $scope.searchText = encodeURIComponent(decodeURIComponent($scope.searchText));
                var searchText = $scope.searchText;
                toaster.pop('success', "Analysis Started", "Enjoy the magic!");
                TwitterProvider.getTweets((searchText)).then(
                    function( tweetsData )
                    {

                    })

            }



      }


        $scope.trends = {};
        $scope.getTrends = function(globalLocationId, localLocationId)
        {
            TwitterProvider.getTrends(globalLocationId).then(
                function( trends )
                {
                   $scope.globalTrends = trends;
                }
            )
            TwitterProvider.getTrends(localLocationId).then(
                function( trends )
                {
                    $scope.localTrends = trends;
                }
            )
        };

        $scope.getSentimentClass = function()
        {
            if(!$scope.searchText)
            return null;
            if(!($scope.tweetsData))
            return null;
            if(!($scope.tweetsData[$scope.searchText]))
            return null;

            if($scope.tweetsData[$scope.searchText])
            var sentiment = $scope.tweetsData[$scope.searchText].overallAnalysis.sentiment;
            if((sentiment == 'Positive') || (sentiment == 'Very Positive'))
            {
                return 'fa text-success fa-5x fa-smile-o'
            }
            else if((sentiment == 'Negative') || (sentiment == 'Very Negative'))
            {
                return 'fa text-danger fa-5x fa-frown-o'
            }
            else
            {
                return 'fa text-warning fa-5x fa-meh-o'
            }
        };

      function init()
      {
            $scope.getTrends(1, 23424848);
      }

      init();

  });
