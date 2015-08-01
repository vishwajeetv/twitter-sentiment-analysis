'use strict';

/**
 * @ngdoc overview
 * @name twitterAppApp
 * @description
 * # twitterAppApp
 *
 * Main module of the application.
 */
angular
  .module('twitterAppApp', [
        'toaster',
        'angular-loading-bar',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
        'restangular','firebase'
  ]).
    config(function (RestangularProvider, SERVER_URL) {
      RestangularProvider.setBaseUrl(SERVER_URL);
      RestangularProvider.setDefaultHeaders({"Content-Type": "application/json"});
    })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
