'use strict';

angular.module('rememoirApp')
  .controller('DeleteAccountCtrl', ['$scope', 'RemIO', 'User', function ($scope, RemIO, User) {

    $scope.deleteAccount = {

      email: '',
      
      password : '',

      deleteAccount: function () {

        RemIO.deleteUser(this.email, this.password);
      }
    };
  }]);
