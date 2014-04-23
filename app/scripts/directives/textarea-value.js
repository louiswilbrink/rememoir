'use strict';

angular.module('rememoirApp')
  .directive('textareaValue', function () {
    return {
      restrict: 'A',
      scope: {
        textareaValue: '='
      },
      link: function postLink(scope, element, attrs) {

        element.bind('keyup', function () {
          scope.$apply(scope.textareaValue = element[0].value);
        });
      }
    };
  });
