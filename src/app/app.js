'use strict';

/**
 * @ngdoc overview
 * @name testPpApp
 * @description
 * # testPpApp
 *
 * Main module of the application.
 */
angular.module('pp.app', [
    //replace:templates-app,
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pp.main',
    'pp.about'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/main.tpl.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'about/about.tpl.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .controller('ppCtrl', function($scope) {
        console.warn('this is weird, why are you not outputing to the browser log.');
    });

