'use strict';

angular.module('rememoirApp')
  .directive('createUser', function () {
    return {
      templateUrl: 'views/create-user.html',
      restrict: 'E',
      controller: ['$scope', 'User', 'RemIO', function ($scope, User, RemIO) {

        // Model
        
        $scope.createUser = {
          email: '',
          password: '',
          panelStatus: 'Sign up with and email address and password',
          panel: {
            isPrimary: true,
            isDanger: false,
            isSuccess: false
          }
        };

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

        $scope.createUser.getPanelClasses = function () {
          return { 
            'panel-primary': $scope.createUser.panel.isPrimary,
            'panel-danger' : $scope.createUser.panel.isDanger, 
            'panel-success' : $scope.createUser.panel.isSuccess
          };
        };

        $scope.signUp = function () {

          console.log('Signing up:', $scope.createUser.email, $scope.createUser.password);
          //RemIO.createUser({});

        };
      }]
    };
  });
