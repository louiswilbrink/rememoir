'use strict';

angular.module('rememoirApp')
  .service('User', ['$rootScope', function User($rootScope) {

    var email, isTemporaryPassword = null;

    return {

      email: function (a) {
        if (a !== undefined) { 
          email = a;
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
