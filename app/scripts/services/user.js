'use strict';

angular.module('rememoirApp')
  .service('User', ['$rootScope', function User($rootScope) {

    var userRef, email, isTemporaryPassword = null;

    return {

      createUserRef: function (newEmail) {

        console.log('creating user ref', newEmail);
      },

      email: function (newEmail) {
        if (typeof newEmail !== undefined) { 
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
