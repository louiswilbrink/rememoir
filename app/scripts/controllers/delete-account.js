'use strict';

angular.module('rememoirApp')
  .controller('DeleteAccountCtrl', ['$scope', '$location', 'RemIO', 'User', function ($scope, $location, RemIO, User) {

    $scope.deleteAccount = {

      status: 'If so, just enter your email and password.',

      email: '',
      
      password : '',

      navigateTo: function (path) {

        $location.path(path);
      },

      deleteAccount: function () {

        RemIO.deleteUser(this.email, this.password);
      }
    };

    $scope.$on('DeleteUserError', function (event, error) {
      if (error.code === 'INVALID_EMAIL') {
        $scope.deleteAccount.status = 'Hmm.. can\'t delete what we never had.  Try another email.';
      }
    });
  }]);
