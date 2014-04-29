'use strict';

angular.module('rememoirApp')
  .service('User', ['$rootScope', '$firebase', function User($rootScope, $firebase) {

    var userRef,
        entriesRef,
        id,
        email,
        isTemporaryPassword = null,

        // TODO: create constantsService and pull this value from there.
        baseUrl = 'https://rememoir.firebaseIO.com';

    return {

      createUserRef: function (newUser) {
        
        //id = newUser.id;
        
        id = '123';  // TODO: sync with Simple Login id.
        email = newUser.email;
        isTemporaryPassword = newUser.isTemporaryPassword;

        userRef = $firebase(new Firebase(baseUrl + '/users/' + id));
        
        userRef.$on('loaded', function () {
          $rootScope.$broadcast('userRefLoaded');
        });
      },

      entriesRef: function () {

        return userRef.$child('entries');
      },

      id: function (newId) {

        if (typeof newId !== 'undefined') {
          id = newId;
        }

        // Don't create getter for now.
      },

      email: function (newEmail) {

        if (typeof newEmail !== 'undefined') { 
          email = newEmail;

          $rootScope.$broadcast('EmailUpdated');

          console.log('$broadcast: EmailUpdated', email);
        }
        else { 
          return email; 
        }
      },

      isTemporaryPassword: function (newIsTemporaryPassword) {

        if (typeof newIsTemporaryPassword === 'boolean') {
          isTemporaryPassword = newIsTemporaryPassword;

          $rootScope.$broadcast('isTemporaryPasswordUpdated');

          console.log('$broadcast: isTemporaryPasswordUpdated', isTemporaryPassword);
        }
        else {
          return isTemporaryPassword;
        }
      }
    }
  }]);
