'use strict';

describe('Service: SERVERURL', function () {

  // load the service's module
  beforeEach(module('twitterAppApp'));

  // instantiate service
  var SERVERURL;
  beforeEach(inject(function (_SERVERURL_) {
    SERVERURL = _SERVERURL_;
  }));

  it('should do something', function () {
    expect(!!SERVERURL).toBe(true);
  });

});
