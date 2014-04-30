'use strict';

angular.module('rememoirApp')
  .controller('MainCtrl', ['$scope', '$firebase', '$location', 'User', 'RemIO', function ($scope, $firebase, $location, User, RemIO) {

    $scope.main = {
      // Model
      
      // Methods
    };

    // Event handlers
    
    $scope.$on('NewUserCreated', function () {
      $location.path('home');
    });

    $scope.$on('LoginSuccess', function () {
      $location.path('home');
    });
  }]);
