'use strict';

/**
 * @ngdoc function
 * @name testPpApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testPpApp
 */
angular.module('pp.about',[])
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
