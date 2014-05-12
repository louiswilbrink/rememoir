'use strict';

angular.module('rememoirApp')
  .service('User', ['$rootScope', '$firebase', function User($rootScope, $firebase) {

    var userRef, user,
        entriesRef,
        id,
        email,
        isTemporaryPassword = undefined,
        baseUrl = 'https://rememoir.firebaseIO.com';

    return {

      createUserRef: function (newUser) {

        // Set info using SimpleLogin returned data.
        this.id(newUser.id);
        this.email(newUser.email);
        this.isTemporaryPassword(newUser.isTemporaryPassword);

        userRef = new Firebase(baseUrl + '/users/' + id);

        var _this = this;

        userRef.once('value', function (snapshot) {

          // Check if if user info matches between SimpleLogin and rememoir database.
          if (_this.email() !== snapshot.val().email) {
            console.log('SYNC ERROR: database and SimpleLogin do not have matching email', _this.email(), snapshot.val().email);
          }
          else {
            console.log('SimpleLogin/Firebase match!', snapshot.val().email);
          }

          user = snapshot.val();

          $rootScope.$broadcast('userLoaded');
        });

        // Update and broadcast for all subsequent value changes.
        userRef.on('value', function (snapshot) {
          user = snapshot.val();
          $rootScope.$broadcast('userUpdated');
        });
      },

      clearUser: function () {

        user = undefined;
        id = undefined;
        email = undefined;
        isTemporaryPassword = undefined;

        $rootScope.$broadcast('EmailUpdated');
        $rootScope.$broadcast('isTemporaryPasswordUpdated');
        $rootScope.$broadcast('userUpdated');
      },

      deleteUser: function () {

        return userRef.remove(function (error) {
          if (!error) {
            console.log('user deleted from firebase:', email, id);
          }
          else {
            console.log('error:', error);
          }
        });
      },

      entries: function () {

        if (user) {
          return user.entries;
        }
      },

      addEntry: function (newEntry) {

        userRef.child('entries').push().set({ 
          date: newEntry.date,
          memory: newEntry.memory,
          isPickMeUp: newEntry.isPickMeUp
        });
      },

      removeEntry: function (key) {

        userRef.child('entries').child(key).remove();
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
        }
        else { 
          return email; 
        }
      },

      isTemporaryPassword: function (newIsTemporaryPassword) {

        if (typeof newIsTemporaryPassword === 'boolean') {
          isTemporaryPassword = newIsTemporaryPassword;

          $rootScope.$broadcast('isTemporaryPasswordUpdated');
        }
        else {
          return isTemporaryPassword;
        }
      }
    }
  }]);
