'use strict';

angular.module('rememoirApp')
  .controller('DeleteAccountCtrl', ['$scope', 'RemIO', function ($scope, RemIO) {

    $scope.deleteAccount = {

      email: '',
      
      password : '',

      deleteAccount: function () {

        RemIO.deleteUser(this.email, this.password);
      }
    };
  }]);
