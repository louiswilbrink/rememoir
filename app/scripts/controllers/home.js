'use strict';

angular.module('rememoirApp')
  .controller('HomeCtrl', ['$scope', 'User', function ($scope, User) {

    $scope.home = {

      // Model.
      
      entries: undefined,

      newEntry: '',

      isPickMeUp: false,

      // Methods.
      
      addEntry: function () {

        // Add entry to firebase.
        this.entries[Date.now()] = {
          date: Date.now(),
          entry: this.newEntry,
          isPickMeUp: this.isPickMeUp
        };

        // Reset entry.
        this.newEntry = '';
        this.isPickMeUp = false;
      },

      removeEntry: function (key) {

        delete this.entries[key];
      },

      togglePickMeUp: function () {

        this.isPickMeUp = !this.isPickMeUp;
      }
    };

    // Event-handlers.

    // Create 3-way binding to user.entries.
    $scope.$on('entriesRefLoaded', function () {
      User.entriesRef().$bind($scope, 'home.entries');
    });
  }]);
