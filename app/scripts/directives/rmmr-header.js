'use strict';

angular.module('rememoirApp')
  .directive('rmmrHeader', function () {
    return {
      templateUrl: 'views/rmmr-header.html',
      restrict: 'E',
      controller: ['$scope', '$location', 'User', 'RemIO', function ($scope, $location, User, RemIO) {

        // Model

        $scope.user = {
          email: ''
        };

        // API

        $scope.user.logout = function () {

          RemIO.logout();

          $location.path('/');
        };

        // Event handlers

        $scope.$on('EmailUpdated', function () {
          console.log('$on: EmailUpdated', 'grabbing user.email', User.email());
          $scope.user.email = User.email();
        });
      }]
    };
  });
