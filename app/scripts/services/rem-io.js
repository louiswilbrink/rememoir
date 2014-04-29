'use strict';

angular.module('rememoirApp')
  .service('RemIO', ['$rootScope', 'User', '$firebase', function RemIO($rootScope, User, $firebase) {

    var usersRef = undefined;

    var ref = new Firebase('https://rememoir.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        $rootScope.$broadcast('LoginError', error);
      } 
      else if (user) {

        User.createUserRef(user); // populates email, entries, etc.

        // TODO: confirm redundance/necessity and remove.
        User.email(user.email);

        User.id(user.id);

        User.isTemporaryPassword(user.isTemporaryPassword);

        $rootScope.$broadcast('LoginSuccess', user);
      } 
      else {

        // user is logged out
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

      createUser: function (email, password) {

        auth.createUser(email, password, function(error, user) {
          if (!error) {

            usersRef = $firebase(new Firebase('https://rememoir.firebaseIO.com/users'));

            var newUser = {};

            newUser[user.id] = {
              email: user.email
            };
           
            usersRef.$update(newUser);

            $rootScope.$broadcast('NewUserCreated');

            console.log('$broadcast: NewUserCreated', user.id, user.email);
          }
          else {
            console.log('Error: createUser', error);
          }
        });
      }
    };
  }]);
