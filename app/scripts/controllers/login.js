'use strict';

angular.module('rememoirApp')
  .controller('LoginCtrl', ['$scope', '$location', 'RemIO', function ($scope, $location, RemIO) {

    $scope.login = {

      // Model.
      
      email: '',
      password: '',
      rememberMe: false,
      status: '',

      // Methods.
      
      signIn: function () {
        RemIO.login({
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe
        });
      },

      onForgetPasswordClicked: function () {
        $location.path('forget-password');
      },

      navigateTo: function (path) {
        
        $location.path(path);
      }
    };

    // Event Handlers

    $scope.$on('LoginError', function (event, error) {
      $scope.$apply(function () {
        $scope.login.status = "uh oh.  That user doesn't seem to exist";
      });
    });
  }]);
