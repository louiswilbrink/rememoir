'use strict';

angular.module('rememoirApp')
  .filter('orderObjectBy', function () {
    return function(items, field, reverse) {

      var filtered = [];
      
      angular.forEach(items, function(item, key) {
        item.firebaseKey = key;
        filtered.push(item);
      });

      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });

      if (reverse) {
        filtered.reverse();
      }

      return filtered;
    };
  });
