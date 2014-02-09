'use strict';

angular.module('rememoirApp')
  .service('User', ['$rootScope', function User($rootScope) {

    var email = '';
    var isLoggedIn = false; // boolean

    return {

      isLoggedIn: function (a) { 
        if (a) { isLoggedIn = a; }
        else { return isLoggedIn; }
      },

      email: function (a) {
        if (a) { email = a; }
        else { return email; }
      }
    }
  }]);
