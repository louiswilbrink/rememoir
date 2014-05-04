'use strict';

angular.module('rememoirApp')
  .directive('login', function () {
    return {
      templateUrl: 'views/login.html',
      restrict: 'E',
      controller: ['$scope', '$location', 'User', 'RemIO', function ($scope, $location, User, RemIO) {

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
          panelStatus: 'Sign up with an email address and password',
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
        
        $scope.onForgetPasswordClicked = function () {

          $location.path('forget-password');

        };

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

          if (!$scope.createUser.email) {
            $scope.createUser.email = $scope.createUser.password = '';
            $scope.createUser.panelStatus = 'Whoops, something went wrong with the email address.  Try again!';
            setPanelClasses('panel-danger');
          }
          else {
            RemIO.createUser($scope.createUser.email, $scope.createUser.password);
          }
        };

        $scope.login.toggleLoginCreateUser = function () {
          $scope.login.showLogin = false;
          $scope.login.showCreateUser = true;
        };

        $scope.login.resetPanelStatus = function () {
          // Remove dangerous panel once fella tries again.
          if ($scope.createUser.panelStatus !== 'Sign up with an email address and password') {
            $scope.createUser.panelStatus = 'Sign up with an email address and password',
            setPanelClasses('panel-primary');
          }
        };

        // Event Handlers

        $scope.$on('LoginError', function (event, error) {
          $scope.$apply(function () {
            setPanelClasses('panel-danger');
            $scope.login.panelStatus = "User does not exist";
          });
        });
      }]
    };
  });
