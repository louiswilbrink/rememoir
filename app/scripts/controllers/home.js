'use strict';

angular.module('rememoirApp')
  .controller('HomeCtrl', ['$scope', '$timeout', 'User', function ($scope, $timeout, User) {

    $scope.home = {

      // Model.
      
      entries: undefined,

      memory: '',

      isPickMeUp: false,

      colorPallete: ['#B565A7', '#ffd600',
        '#e46764', '#f47d44', '#ceb48d',
        '#7f7ea8', '#752864', '#006bb6',
        '#46866f'],
        //['#67C5ED', '#39A1CE', '#35BEFA'],
    
      // Methods.
      
      addEntry: function () {

        var newEntry = {
          date: Date.now(),
          memory: this.memory,
          isPickMeUp: this.isPickMeUp
        };

        User.addEntry(newEntry);

        // Reset new entry form.
        this.memory = '';
        this.isPickMeUp = false;
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

    $scope.$on('userUpdated', function () {
      $scope.home.entries = User.entries();
    });
  }]);
