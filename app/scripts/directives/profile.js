'use strict';

angular.module('rememoirApp')
  .directive('profile', function () {
    return {
      templateUrl: 'views/profile.html',
      restrict: 'E',
      controller: ['$scope', function ($scope) {
      }]
    };
  });
