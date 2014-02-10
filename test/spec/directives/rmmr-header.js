'use strict';

describe('Directive: rmmrHeader', function () {

  // load the directive's module
  beforeEach(module('rememoirApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rmmr-header></rmmr-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rmmrHeader directive');
  }));
});
