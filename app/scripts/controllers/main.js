'use strict';

angular.module('rememoirApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'User', function ($scope, $firebase, User) {

    // Model
    
    $scope.user = {
      email: ''
    };
    
    $scope.login = {};
    $scope.login.email = '';
    $scope.login.password = '';
    $scope.login.rememberMe = false;

    $scope.panelStatus = '';
    $scope.panel = {
      isDefault : true,
      isDanger : false,
      isSuccess : false
    };

    // Firebase

    var ref = new Firebase('https://rememoir.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
        setPanelClasses('panel-danger');
        $scope.panelStatus = "User does not exist";
        $scope.$digest();
      } 
      else if (user) {
        // user authenticated with Firebase
        User.email(user.email);
        setPanelClasses('panel-success');
        $scope.panelStatus = 'Success!  You are logged in as ' + User.email();
        $scope.$digest();
      } 
      else {
        // user is logged out
        console.log('no one is logged in on this computer');
        setPanelClasses('panel-default');
        $scope.panelStatus = 'Log in';
        User.email('');
        $scope.$digest();
      }
    });

    // Methods

    var setPanelClasses = function (panelClass) {
      switch (panelClass) {
        case 'panel-default':
          $scope.panel = {
            isDefault : true,
            isDanger : false,
            isSuccess : false
          };
          break;
        case 'panel-danger':
          $scope.panel = {
            isDefault : false,
            isDanger : true,
            isSuccess : false
          };
          break;
        case 'panel-success':
          $scope.panel = {
            isDefault : false,
            isDanger : false,
            isSuccess : true
          };
          break;
        default:
          $scope.panel = {
            isDefault : true,
            isDanger : false,
            isSuccess : false
          };
      }
    };

    // API

    $scope.getPanelClasses = function () {
      return { 
        'panel-default': $scope.panel.isDefault,
        'panel-danger' : $scope.panel.isDanger, 
        'panel-success' : $scope.panel.isSuccess
      };
    };

    $scope.signIn = function () {

      auth.login('password', {
        email: $scope.login.email,
        password: $scope.login.password,
        rememberMe: $scope.login.rememberMe
      });
    };

    $scope.logout = function () {

      auth.logout();

    };

    // Event handlers

    $scope.$on('EmailUpdated', function () {
      $scope.user.email = User.email();
    });
  }]);
