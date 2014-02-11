'use strict';

angular.module('rememoirApp')
  .service('RemIO', ['$rootScope', 'User', function RemIO($rootScope, User) {

    var ref = new Firebase('https://rememoir.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        $rootScope.$broadcast('LoginError', error);
      } 
      else if (user) {
        // user authenticated with Firebase
        User.email(user.email);
        $rootScope.$broadcast('LoginSuccess', user);
      } 
      else {
        // user is logged out
        User.email('');
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
      },

      createUser: function (email, password) {

        auth.createUser(email, password, function(error, user) {
          if (!error) {
            User.email(user.email);
            console.log('New user created:', user.id, user.email);
            $rootScope.$broadcast('NewUserCreated');
          }
        });
      }
    };
  }]);
