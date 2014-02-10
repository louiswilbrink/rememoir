'use strict';

angular.module('rememoirApp')
  .directive('login', function () {
    return {
      templateUrl: 'views/login.html',
      restrict: 'E',
      controller: ['$scope', 'User', 'RemIO', function ($scope, User, RemIO) {

        // Model
        
        $scope.login = {};
        $scope.login.email = '';
        $scope.login.password = '';
        $scope.login.rememberMe = false;

        $scope.panelStatus = '';
        $scope.panel = {
          isPrimary : true,
          isDanger : false,
          isSuccess : false
        };

        // Methods

        var setPanelClasses = function (panelClass) {
          switch (panelClass) {
            case 'panel-primary':
              $scope.panel = {
                isPrimary : true,
                isDanger : false,
                isSuccess : false
              };
              break;
            case 'panel-danger':
              $scope.panel = {
                isPrimary : false,
                isDanger : true,
                isSuccess : false
              };
              break;
            case 'panel-success':
              $scope.panel = {
                isPrimary : false,
                isDanger : false,
                isSuccess : true
              };
              break;
            default:
              $scope.panel = {
                isPrimary : true,
                isDanger : false,
                isSuccess : false
              };
          }
        };

        // API

        $scope.getPanelClasses = function () {
          return { 
            'panel-primary': $scope.panel.isPrimary,
            'panel-danger' : $scope.panel.isDanger, 
            'panel-success' : $scope.panel.isSuccess
          };
        };

        $scope.signIn = function () {

          RemIO.login({
            email: $scope.login.email,
            password: $scope.login.password,
            rememberMe: $scope.login.rememberMe
          });
        };

        // Event Handlers

        $scope.$on('LoginError', function (event, error) {
          console.log('$on.LoginError', error);
          setPanelClasses('panel-danger');
          $scope.panelStatus = "User does not exist";
          $scope.$digest();
        });

        $scope.$on('LoginSuccess', function (event, user) {
          console.log('$on.LoginSuccess', user);
          User.email(user.email);
          setPanelClasses('panel-success');
          $scope.panelStatus = 'Success!  You are logged in as ' + User.email();
          $scope.$digest();
        });

        $scope.$on('Logout', function (event) {
          console.log('$on.Logout');
          setPanelClasses('panel-primary');
          $scope.panelStatus = 'Log in';
          User.email('');
          $scope.$digest();
        });
      }]
    };
  });
