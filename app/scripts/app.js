'use strict';

angular.module('rememoirApp', ['ngRoute', 'firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/forget-password', {
        templateUrl: 'views/forget-password-page.html',
      })
      .when('/home', {
        templateUrl: 'views/home.html',
      })
      .when('/the-rack', {
        templateUrl: 'views/the-rack.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
