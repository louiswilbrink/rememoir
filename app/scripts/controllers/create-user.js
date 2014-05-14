'use strict';

angular.module('rememoirApp')
  .controller('CreateUserCtrl', ['$scope', 'RemIO', function ($scope, RemIO) {

    $scope.createUser = {
      email: '',
      password: '',
      status: {
        text: 'Sign up with just an email and password!',
        isError: false
      },
      
      signUp: function () {
        if (!$scope.createUser.email) {
          $scope.createUser.email = $scope.createUser.password = '';
        }
        else {
          RemIO.createUser($scope.createUser.email, $scope.createUser.password);
        }
      }
    };

    $scope.$on('CreateUserError', function (event, error) {

      $scope.$apply(function () {

        // TODO: Add 'EMAIL_TAKEN' to constant service.
        if (error.code === 'EMAIL_TAKEN') {

          $scope.createUser.status.text = 'The email is already taken';
          $scope.createUser.status.isError = true;

          // Clear form for retry.
          $scope.createUser.email = '';
          $scope.createUser.password = '';
        }
        else {

          $scope.createUser.status.text = error.code;
        }
      });
    });

    $scope.$on('CreateUserSuccess', function () {
      $scope.$apply(function () {
        $scope.createUser.status.isError = false;
      });
    });
  }]);
