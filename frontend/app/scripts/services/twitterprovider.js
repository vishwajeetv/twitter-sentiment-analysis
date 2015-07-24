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
        var url = SERVER_URL + 'tweet/getAnalyzedTweets/?search='+searchText;
        var deferred = $q.defer();
        $http.get(url).
            success(function (data, status, headers, config) {
              deferred.resolve(data.tweets);
            }).
            error(function (data, status, headers, config) {
              deferred.reject();
              console.log("could not retrieve tweets");
            });
        return deferred.promise;
      };
  });
