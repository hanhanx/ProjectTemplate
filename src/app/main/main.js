'use strict';

/**
 * @ngdoc function
 * @name testPpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testPpApp
 */
angular.module('pp.main',[])
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
