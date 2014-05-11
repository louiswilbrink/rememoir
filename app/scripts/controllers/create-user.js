'use strict';

angular.module('rememoirApp')
  .controller('CreateUserCtrl', function ($scope) {

    $scope.createUser = {
      email: '',
      password: '',
      status: 'Sign up with just an email and password!'
    };

    $scope.createUser.signUp = function () {

      if (!$scope.createUser.email) {
        $scope.createUser.email = $scope.createUser.password = '';
      }
      else {
        RemIO.createUser($scope.createUser.email, $scope.createUser.password);
      }
    };

  });
