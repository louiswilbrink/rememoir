'use strict';

angular.module('rememoirApp')
  .service('User', ['$rootScope', '$firebase', function User($rootScope, $firebase) {

    var userRef,
        email,
        isTemporaryPassword,
        entries = null;

    return {

      // Send this to backend.
      getUserId: function (email) {

        return '123';
      },

      createUserRef: function (email) {

        var userId = this.getUserId(email);

        /*
        var userRef = new Firebase('https://rememoir.firebaseio.com/users/' + userId);

        userRef.on('value', function (snapshot) {
          console.log('snapshot: ', snapshot);
          console.log('full user data: ', snapshot.val());
        });
        */

        var userFirebase = $firebase(new Firebase('https://rememoir.firebaseIO.com/users/'/* + userId*/));

        entries = userFirebase.$child('entries');

      },

      entries: function () {

        if (typeof entries === 'undefined') {
          return 'no entries found';
        }

        return entries;
      },

      email: function (newEmail) {
        if (typeof newEmail !== 'undefined') { 
          email = newEmail;
          this.createUserRef(newEmail);
          $rootScope.$broadcast('EmailUpdated');
        }
        else { 
          return email; 
        }
      },

      isTemporaryPassword: function (a) {

        if (typeof a === 'boolean') {
          isTemporaryPassword = a;
          $rootScope.$broadcast('isTemporaryPasswordUpdated');
        }
        else {
          return isTemporaryPassword;
        }
      }
    }
  }]);
