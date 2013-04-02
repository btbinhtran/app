var app = require('..')()()
  , model = require('tower-model')
  , assert = require('assert');

describe('app', function(){
  it('should load modules', function(){
    var User = app.model('user')
      .attr('email');

    assert(model === app.model);
  });
});