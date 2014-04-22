'use strict';

angular.module('rememoirApp')
  .controller('HomeCtrl', ['$scope', 'User', function ($scope, User) {

    $scope.home = {

      // Model.
      
      entries: undefined

      // Methods.

    };

    // Event-handlers.
    
    $scope.$on('entriesUpdated', function () {
      $scope.home.entries = User.entries();
    });
  }]);
