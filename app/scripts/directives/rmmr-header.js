'use strict';

angular.module('rememoirApp')
  .directive('rmmrHeader', function () {
    return {
      templateUrl: 'views/rmmr-header.html',
      restrict: 'E',
      controller: ['$scope', '$location', '$timeout', '$modal', '$log', 'User', 'RemIO', function ($scope, $location, $timeout, $modal, $log, User, RemIO) {

        $scope.user = {
          
          // Model

          // Pull email from User service.
          // If service hasn't yet loaded an initial value, oh well.
          email: User.email(),

          // API
        
          logout: function () {

            RemIO.logout();
          },
          
          navigateTo: function (path) {

            $location.path(path);
          }
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
