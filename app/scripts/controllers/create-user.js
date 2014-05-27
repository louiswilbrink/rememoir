'use strict';

angular.module('rememoirApp')
  .controller('CreateUserCtrl', ['$scope', '$location', 'RemIO', function ($scope, $location, RemIO) {

    $scope.createUser = {

      // Model.

      email: '',

      password: '',

      status: {
        text: 'Sign up with just an email and password',
        isError: false
      },

      // API.
      
      navigateTo: function (path) {

        $location.path(path);
      },

      signUp: function () {

        var _this = this;

        if (!$scope.createUser.email) {
          _this.status.text = 'Please enter an email address';
          _this.status.isError = true;
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
