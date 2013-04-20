var app = require('..')
  , assert = require('assert')

describe('app', function(){
  it('should load modules', function(){
    var User = app.model('user')
      .attr('email');

    assert(require('tower-model') === app.model);
  });

  it('should have the adapter', function(){
    var mock = app.adapter('mock')

    mock
      .type('boolean')
        .to(function(val) { return !!val; })
        .from(function(val) { return !!val; });

    //console.log(mock);

    assert(require('tower-adapter') == app.adapter);
  });

  it('should query', function(){
    var query = app.query
    assert(require('tower-query') == query);

    var q = query()
      .select('post')
      .where('title').eq('post three');

    console.log(q);
  });
});