'use strict';

angular.module('rememoirApp')
  .controller('ForgetPasswordCtrl', ['$scope', '$location', 'RemIO', function ($scope, $location, RemIO) {

    
    $scope.forgetPassword = {

      // Model.
      
      email: '',
      
      status: 'Enter your email address and we\'ll send you a temporary password',

      // API.
      
      navigateTo: function (path) {
        
        $location.path(path);
      },
    
      onSendResetEmailClicked: function () {
        console.log('Sending reset email to:', $scope.forgetPassword.email);
        RemIO.resetPassword($scope.forgetPassword.email);
      }
    };

    $scope.$on('ResetPasswordSuccess', function () {
      $scope.$apply(function () {
        $scope.forgetPassword.status = 'An reset email is on it\'s way';
      });
    });
  }]);
