'use strict';

angular.module('rememoirApp')
  .controller('HomeCtrl', ['$scope', '$timeout', 'User', function ($scope, $timeout, User) {

    $scope.home = {

      // Model.
      
      entries: undefined,

      memory: '',

      isPickMeUp: false,

      // Methods.
      
      addEntry: function () {

        var newEntry = {
          date: Date(),
          memory: this.memory,
          isPickMeUp: this.isPickMeUp
        };

        User.addEntry(newEntry);

        this.memory = '';
        this.isPickMeUp = true;
      },

      removeEntry: function (key) {

        User.removeEntry(key);
      },

      togglePickMeUp: function () {

        this.isPickMeUp = !this.isPickMeUp;
      }
    };

    // Event-handlers.
  
    $scope.$on('userLoaded', function () {
      $scope.$apply(function () {
        $scope.home.entries = User.entries();
      });
    });

    // Create 3-way binding to user.entries.
    $scope.$on('userUpdated', function () {
      $scope.home.entries = User.entries();
    });
  }]);
