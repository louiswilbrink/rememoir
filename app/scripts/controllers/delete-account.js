'use strict';

angular.module('rememoirApp')
  .controller('DeleteAccountCtrl', ['$scope', '$location', 'RemIO', 'User', function ($scope, $location, RemIO, User) {

    $scope.deleteAccount = {

      status: '',

      email: '',
      
      password : '',

      navigateTo: function (path) {

        $location.path(path);
      },

      deleteAccount: function () {

        RemIO.deleteUser(this.email, this.password);
      }
    };
  }]);
