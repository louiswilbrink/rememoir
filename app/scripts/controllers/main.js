'use strict';

angular.module('rememoirApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'User', function ($scope, $firebase, User) {

    $scope.login = {};
    $scope.login.email = '';
    $scope.login.password = '';

    $scope.panelStatus = '';
    $scope.panel = {
      isDefault : true,
      isDanger : false,
      isSuccess : false
    };

    $scope.date = new Date();

    var ref = new Firebase('https://rememoir.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
        $scope.panel = {
          isDefault : false,
          isDanger : true,
          isSuccess : false
        };
        $scope.panelStatus = "User does not exist";
        $scope.$digest();
      } 
      else if (user) {
        // user authenticated with Firebase
        User.email(user.email);
        User.isLoggedIn(true);
        $scope.panel = {
          isDefault : false,
          isDanger : false,
          isSuccess : true
        };
        $scope.panelStatus = 'Success!  You are logged in as ' + User.email();
        $scope.$digest();
      } 
      else {
        // user is logged out
        console.log('no one is logged in on this computer');
        $scope.panel = {
          isDefault : true,
          isDanger : false,
          isSuccess : false
        };
        $scope.panelStatus = 'Log in';
        $scope.$digest();
      }
    });

    $scope.signIn = function () {

      auth.login('password', {
        email: $scope.login.email,
        password: $scope.login.password,
        rememberMe: $scope.login.rememberMe
      });
    };

    $scope.logout = function () {

      auth.logout();

    };
  }]);
