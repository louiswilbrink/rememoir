'use strict';

angular.module('rememoirApp')
  .directive('rmmrHeader', function () {
    return {
      templateUrl: 'views/rmmr-header.html',
      restrict: 'E',
      controller: ['$scope', '$location', '$timeout', 'User', 'RemIO', function ($scope, $location, $timeout, User, RemIO) {

        $scope.user = {
          
          // Model

          // Pull email from User service.
          // If service hasn't yet loaded an initial value, oh well.
          email: User.email()
        };

        // API

        $scope.user.logout = function () {

          RemIO.logout();
        };

        // Event handlers

        $scope.$on('EmailUpdated', function () {
          $scope.$apply(function () {
            $scope.user.email = User.email();
          });
        });
      }]
    };
  });
