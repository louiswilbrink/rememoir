'use strict';

describe('Directive: createUser', function () {

  // load the directive's module
  beforeEach(module('rememoirApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-user></create-user>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the createUser directive');
  }));
});
