'use strict';

angular.module('rememoirApp')
  .directive('changePassword', function () {
    return {
      templateUrl: 'views/change-password.html',
      restrict: 'E',
      controller: ['$scope', 'RemIO', function ($scope, RemIO) {

        $scope.changePassword = {
        
          // Model.
        
          tempPassword: '',
          newPassword: '',
          confirmPassword: '',
          title: 'Change Password',

          // API.

          onChangePasswordClicked: function () {
            if (this.newPassword === this.confirmPassword) {
              RemIO.changePassword(this.tempPassword, this.newPassword);
            }
            else {
              console.log('not the same!');
            }
          }
        };

        // Event-handlers.
        
      }]
    };
  });
