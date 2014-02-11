'use strict';

angular.module('rememoirApp')
  .directive('createUser', function () {
    return {
      templateUrl: 'views/create-user.html',
      restrict: 'E',
      controller: ['$scope', 'User', 'RemIO', function ($scope, User, RemIO) {

        // Model
        
        // Methods

        var setPanelClasses = function (panelClass) {
          switch (panelClass) {
            case 'panel-primary':
              $scope.createUser.panel = {
                isPrimary : true,
                isDanger : false,
                isSuccess : false
              };
              break;
            case 'panel-danger':
              $scope.createUser.panel = {
                isPrimary : false,
                isDanger : true,
                isSuccess : false
              };
              break;
            case 'panel-success':
              $scope.createUser.panel = {
                isPrimary : false,
                isDanger : false,
                isSuccess : true
              };
              break;
            default:
              $scope.createUser.panel = {
                isPrimary : true,
                isDanger : false,
                isSuccess : false
              };
          }
        };

        // API

      }]
    };
  });
