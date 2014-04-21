'use strict';

angular.module('rememoirApp')
  .controller('HomeCtrl', ['User', function ($scope, User) {

    $scope.home = {

      entries: ['Solidtude is the furnace of transformation']

    };
  }]);
