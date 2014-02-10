'use strict';

describe('Service: RemIo', function () {

  // load the service's module
  beforeEach(module('rememoirApp'));

  // instantiate service
  var RemIo;
  beforeEach(inject(function (_RemIo_) {
    RemIo = _RemIo_;
  }));

  it('should do something', function () {
    expect(!!RemIo).toBe(true);
  });

});
