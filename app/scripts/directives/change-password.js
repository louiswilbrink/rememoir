'use strict';

angular.module('rememoirApp')
  .directive('changePassword', function () {
    return {
      templateUrl: 'views/change-password.html',
      restrict: 'E',
      controller: ['$scope', 'RemIO', 'User', function ($scope, RemIO, User) {

        $scope.changePassword = {
        
          // Model.
        
          isTemporaryPassword: false,
          temporaryPassword: '',
          newPassword: '',
          confirmPassword: '',
          title: 'Change Password',

          // API.

          onChangePasswordClicked: function () {
            if (this.newPassword === this.confirmPassword) {
              RemIO.changePassword(this.temporaryPassword, this.newPassword);
            }
            else {
              console.log('not the same!');
            }
          }
        };

        // Event-handlers.
        
        $scope.$on('isTemporaryPasswordUpdated', function () {
          $scope.changePassword.isTemporaryPassword = User.isTemporaryPassword();
          $scope.$digest();
        });
      }]
    };
  });
