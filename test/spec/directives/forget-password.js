'use strict';

describe('Directive: forgetPassword', function () {

  // load the directive's module
  beforeEach(module('rememoirApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<forget-password></forget-password>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the forgetPassword directive');
  }));
});
