'use strict';

angular.module('rememoirApp')
  .directive('rmmrHeader', function () {
    return {
      templateUrl: 'views/rmmr-header.html',
      restrict: 'E',
      controller: ['$scope', '$location', 'User', 'RemIO', function ($scope, $location, User, RemIO) {

        $scope.user = {
          
          // Model

          // Pull email from User service.
          // If service hasn't yet loaded an initial value, oh well.
          email: User.email()
        };

        // API

        $scope.user.logout = function () {

          RemIO.logout();

          $location.path('/');
        };

        // Event handlers

        $scope.$on('EmailUpdated', function () {
          console.log('$on: EmailUpdated', 'grabbing user.email', User.email());
          $scope.$apply(function () {
            $scope.user.email = User.email();
          });
        });
      }]
    };
  });
