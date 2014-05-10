'use strict';

angular.module('rememoirApp', ['ngRoute', 'firebase', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/forget-password', {
        templateUrl: 'views/forget-password-page.html',
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/delete-account', {
        templateUrl: 'views/delete-account.html',
        controller: 'DeleteAccountCtrl'
      })
      .when('/the-rack', {
        templateUrl: 'views/the-rack.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
