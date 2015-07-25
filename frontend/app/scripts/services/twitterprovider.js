'use strict';

/**
 * @ngdoc service
 * @name twitterAppApp.TwitterProvider
 * @description
 * # TwitterProvider
 * Service in the twitterAppApp.
 */
angular.module('twitterAppApp')
  .service('TwitterProvider', function ($http, $q, SERVER_URL) {
      this.getTweets = function (searchText) {
        var url = SERVER_URL + 'tweet/getAnalyzedTweets/?query='+searchText;
        var deferred = $q.defer();
        $http.get(url).
            success(function (data, status, headers, config) {
              deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
              deferred.reject();
              console.log("could not retrieve tweets");
            });
        return deferred.promise;
      };

        this.getTrends = function (locationId) {
            var url = SERVER_URL + 'tweet/getTrends/?location='+locationId;
            var deferred = $q.defer();
            $http.get(url).
                success(function (data, status, headers, config) {
                    deferred.resolve(data.trends[0].trends);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject();
                    console.log("could not retrieve tweets");
                });
            return deferred.promise;
        };
  });
