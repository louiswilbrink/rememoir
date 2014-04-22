'use strict';

angular.module('rememoirApp')
  .service('User', ['$rootScope', '$firebase', function User($rootScope, $firebase) {

    var userRef,
        entriesRef,
        entries,
        email,
        isTemporaryPassword = null;

    return {

      createUser: function (email) {

        // Save reference to service object.
        var _this = this;

        // Set firebase reference to all users.
        // TODO: make $http request for userId.
        // Avoid ever giving access to users.
        var usersRef = $firebase(new Firebase('https://rememoir.firebaseIO.com/users'));

        usersRef.$on('loaded', function (snapshot) {

          angular.forEach(snapshot, function (value, key) {

            // Corresponding user id found.
            if (value.email === email) {

              // Create user and entries firebase references.
              // TODO: retrieve url from backend.
              userRef = $firebase(new Firebase('https://rememoir.firebaseIO.com/users/' + key));

              entriesRef = userRef.$child('entries');

              // Set up callbacks on database value load/changes.
              entriesRef.$on('loaded', function (snapshot) {
                _this.entries(snapshot);
              });

              entriesRef.$on('change', function (snapshot) {
                _this.entries(snapshot);
              });
            }
          });
        });
      },

      entries: function (newEntries) {

        if (typeof newEntries !== 'undefined') { 

          entries = newEntries;

          $rootScope.$broadcast('entriesUpdated');

          console.log('$broadcast: entriesUpdated', entries);
        }
        else { 

          return entries; 
        }
      },

      email: function (newEmail) {

        if (typeof newEmail !== 'undefined') { 
          email = newEmail;

          this.createUser(newEmail);

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
