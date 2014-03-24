'use strict';

angular.module('rememoirApp', [ 'ngRoute', 'firebase' ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/forget-password', {
        templateUrl: 'views/forget-password-page.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
