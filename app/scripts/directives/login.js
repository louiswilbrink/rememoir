'use strict';

angular.module('rememoirApp')
  .directive('login', function () {
    return {
      templateUrl: 'views/login.html',
      restrict: 'E',
      controller: ['$scope', 'User', 'RemIO', function ($scope, User, RemIO) {

        // Model
        
        $scope.login = {
          email: '',
          password: '',
          rememberMe: false,
          panelStatus: 'Log in',
          panel: {
            isPrimary: true,
            isDanger: false,
            isSuccess: false
          },
          showLogin: true,
          showCreateUser: false
        };

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
              $scope.login.panel = {
                isPrimary : true,
                isDanger : false,
                isSuccess : false
              };
              break;
            case 'panel-danger':
              $scope.login.panel = {
                isPrimary : false,
                isDanger : true,
                isSuccess : false
              };
              break;
            case 'panel-success':
              $scope.login.panel = {
                isPrimary : false,
                isDanger : false,
                isSuccess : true
              };
              break;
            default:
              $scope.login.panel = {
                isPrimary : true,
                isDanger : false,
                isSuccess : false
              };
          }
        };

        // API

        $scope.login.getPanelClasses = function () {
          return { 
            'panel-primary': $scope.login.panel.isPrimary,
            'panel-danger' : $scope.login.panel.isDanger, 
            'panel-success' : $scope.login.panel.isSuccess
          };
        };

        $scope.createUser.getPanelClasses = function () {
          return { 
            'panel-primary': $scope.createUser.panel.isPrimary,
            'panel-danger' : $scope.createUser.panel.isDanger, 
            'panel-success' : $scope.createUser.panel.isSuccess
          };
        };

        $scope.signIn = function () {

          RemIO.login({
            email: $scope.login.email,
            password: $scope.login.password,
            rememberMe: $scope.login.rememberMe
          });
        };

        $scope.signUp = function () {

          console.log('Signing up:', $scope.createUser.email, $scope.createUser.password);
          //RemIO.createUser({});
        };

        $scope.toggleLoginCreateUser = function () {
          $scope.login.showLogin = false;
          $scope.login.showCreateUser = true;
        };

        // Event Handlers

        $scope.$on('LoginError', function (event, error) {
          setPanelClasses('panel-danger');
          $scope.login.panelStatus = "User does not exist";
          $scope.$digest();
        });

        $scope.$on('LoginSuccess', function (event, user) {
          setPanelClasses('panel-success');
          $scope.login.panelStatus = 'Success!  You are logged in as ' + User.email();
          $scope.$digest();
        });

        $scope.$on('Logout', function (event) {
          setPanelClasses('panel-primary');
          $scope.login.panelStatus = 'Log in';
          $scope.$digest();
        });
      }]
    };
  });
