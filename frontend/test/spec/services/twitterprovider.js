'use strict';

describe('Service: TwitterProvider', function () {

  // load the service's module
  beforeEach(module('twitterAppApp'));

  // instantiate service
  var TwitterProvider;
  beforeEach(inject(function (_TwitterProvider_) {
    TwitterProvider = _TwitterProvider_;
  }));

  it('should do something', function () {
    expect(!!TwitterProvider).toBe(true);
  });

});
