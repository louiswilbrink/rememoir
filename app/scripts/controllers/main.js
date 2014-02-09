'use strict';

angular.module('rememoirApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'User', function ($scope, $firebase, User) {

    $scope.email = 'mica@gmail.com';

    $scope.login = {};
    $scope.login.email = "";
    $scope.login.password = "";

    var ref = new Firebase('https://rememoir.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        User.email(user.email);
        User.isLoggedIn(true);
        console.log(User.email(), User.isLoggedIn());
        // Not working...
        //$scope.email = user.email;
      } else {
        // user is logged out
        console.log('no one is logged in on this computer');
      }
    });

    $scope.$on('LoginUpdate', function () {
      console.log('$on.LoginUpdate');
      //$scope.email = User.email();
    });

    $scope.signIn = function () {

      auth.login('password', {
        email: $scope.login.email,
        password: $scope.login.password,
        rememberMe: $scope.login.rememberMe
      });
    };
  }]);
