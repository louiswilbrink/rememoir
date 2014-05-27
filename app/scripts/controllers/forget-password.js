'use strict';

angular.module('rememoirApp')
  .controller('ForgetPasswordCtrl', ['$scope', '$location', 'RemIO', function ($scope, $location, RemIO) {

    
    $scope.forgetPassword = {

      // Model.
      
      email: '',

      // API.
      
      navigateTo: function (path) {
        
        $location.path(path);
      },
    
      onSendResetEmailClicked: function () {
        console.log('Sending reset email to:', $scope.forgetPassword.email);
        RemIO.resetPassword($scope.forgetPassword.email);
      }
    };
  }]);
