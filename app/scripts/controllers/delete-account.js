'use strict';

angular.module('rememoirApp')
  .controller('DeleteAccountCtrl', function ($scope) {

    $scope.deleteAccount = {

      email: '',
      
      password : '',

      deleteAccount: function () {

        console.log('call that service:', this.email, this.password);

      }
    };
  });
