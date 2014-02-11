'use strict';

angular.module('rememoirApp')
  .directive('rmmrHeader', function () {
    return {
      templateUrl: 'views/rmmr-header.html',
      restrict: 'E',
      controller: ['$scope', 'User', 'RemIO', function ($scope, User, RemIO) {

        // Model

        $scope.user = {
          email: ''
        };

        // API

        $scope.logout = function () {

          RemIO.logout();
        };

        // Event handlers

        $scope.$on('EmailUpdated', function () {
          $scope.user.email = User.email();
          $scope.$digest();
        });
      }]
    };
  });
