'use strict';

angular.module('rememoirApp')
  .service('RemIO', ['$rootScope', '$location', 'User', '$firebase', function RemIO($rootScope, $location, User, $firebase) {

    var usersRef = undefined;

    var ref = new Firebase('https://rememoir.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        $rootScope.$broadcast('LoginError', error);
      } 
      else if (user) {

        User.createUserRef(user); // populates email, entries, etc.

        $rootScope.$broadcast('LoginSuccess');

        $rootScope.$apply(function () {
          $location.path('/home');
        });
      } 
      else {

        User.clearUser();

        $rootScope.$apply(function () {
          $location.path('/');
        });
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
      
      resetPassword: function (email) {
        auth.sendPasswordResetEmail(email, function(error, success) {
          if (!error) {
            console.log('Password reset email sent successfully');
          }
        });
      },

      changePassword: function (oldPassword, newPassword) {
        auth.changePassword(User.email(), oldPassword, newPassword, function(error, success) {
          if (!error) {
            console.log('Password changed successfully');
          }
        });
      },

      deleteUser: function (email, password) {

        var _this = this;

        auth.removeUser(email, password, function(error, success) {
          if (!error) {
            console.log('User deleted successfully', email);
          }
          else {
            console.log('deleteUser error:', error);
          }
        }).then(function () {
          User.deleteUser();
          _this.logout();
        });
      },

      createUser: function (email, password) {

        var _this = this;

        auth.createUser(email, password, function(error, user) {
          if (!error) {

            // TODO: Unbind right after database interaction.
            usersRef = $firebase(new Firebase('https://rememoir.firebaseIO.com/users'));

            // Create a new user object using the SimpleLogin id as the key.
            var newUser = {};

            newUser[user.id] = {
              email: user.email,
              entries: {
                barrel_bottom: 'avoids emptying the entries reference completely'
              }
            };
           
            // Use $update in order to set the correct key (user.id).
            // $add will just push the object with a random key.
            // We don't want that since we'd like the id between the firebase and SimpleLogin to match.
            usersRef.$update(newUser);

            // Log in.
            _this.login({
              email: email,
              password: password,
              rememberMe: false
            });

            $rootScope.$apply(function () {
              $location.path('/home');
            });
          }
          else {
            console.log('Error: createUser', error);
          }
        });
      }
    };
  }]);
