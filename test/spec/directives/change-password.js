'use strict';

describe('Directive: changePassword', function () {

  // load the directive's module
  beforeEach(module('rememoirApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<change-password></change-password>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the changePassword directive');
  }));
});
