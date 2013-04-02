var app = require('..')()()
  , model = require('tower-model')
  , route = require('tower-route')
  , router = require('tower-router')
  , Context = require('tower-context')
  , assert = require('assert');

describe('app', function(){
  it('should load modules', function(){
    var User = app.model('user')
      .attr('email');

    assert(model === app.model);
  });

  it('should handle route', function(done){
    var calls = 0;

    route('/users', 'users.index')
      .use(function(context, next){
        calls++;
        next();
      });

    router(new Context('/users'), function(){
      assert(1 == calls);
      done();
    })
  });
});