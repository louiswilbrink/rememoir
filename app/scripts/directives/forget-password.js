'use strict';

angular.module('rememoirApp')
  .directive('forgetPassword', function () {
    return {
      templateUrl: 'views/forget-password.html',
      restrict: 'E',
      controller: ['$scope', '$location', 'RemIO', function ($scope, $location, RemIO) {

        $scope.forgetPassword = {
          email: ""
        };

        // API

        $scope.onSendResetEmailClicked = function () {
          console.log('Sending reset email to:', $scope.forgetPassword.email);
          RemIO.resetPassword($scope.forgetPassword.email);
        };
      }]
    };
  });
