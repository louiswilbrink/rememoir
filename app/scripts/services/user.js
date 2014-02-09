'use strict';

angular.module('rememoirApp')
  .service('User', ['$rootScope', function User($rootScope) {

    var email = '';

    return {

      email: function (a) {
        if (a !== undefined) { 
          email = a;
          $rootScope.$broadcast('EmailUpdated');
        }
        else { 
          return email; 
        }
      }
    }
  }]);
