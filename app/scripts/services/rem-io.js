'use strict';

angular.module('rememoirApp')
  .service('RemIO', ['$rootScope', function RemIO($rootScope) {

    var ref = new Firebase('https://rememoir.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        console.log('$broadcast.LoginError');
        $rootScope.$broadcast('LoginError', error);
      } 
      else if (user) {
        // user authenticated with Firebase
        console.log('$broadcast.LoginSuccess');
        $rootScope.$broadcast('LoginSuccess', user);
      } 
      else {
        // user is logged out
        console.log('$broadcast.Logout');
        $rootScope.$broadcast('Logout');
      }
    });

    return {

      ref: function () { return ref; },

      auth: function () { return auth; },

      logout: function () { auth.logout(); },

      login: function (credentials) {

        auth.login('password', {
          email: credentials.email,
          password: credentials.password,
          rememberMe: credentials.rememberMe
        });
      }
    };
  }]);
