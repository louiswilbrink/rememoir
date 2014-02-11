'use strict';

angular.module('rememoirApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'User', 'RemIO', function ($scope, $firebase, User, RemIO) {

    $scope.main = {
      showProfile: false
    };

    // Methods

    // Event handlers
    
    $scope.$on('LoginSuccess', function () {
      $scope.main.showProfile = true;
    });

    $scope.$on('NewUserCreated', function () {
      $scope.main.showProfile = true;
    });

    $scope.$on('Logout', function () {
      $scope.main.showProfile = false;
    });
  }]);
