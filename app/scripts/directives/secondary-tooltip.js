'use strict';

angular.module('rememoirApp')
  .directive('secondaryTooltip', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the secondaryTooltip directive');
      }
    };
  });
