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

    router('/users', function(){
      assert(1 == calls);
      done();
    })
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

  it('should have the graph (for queries)', function(){
    var graph = app.graph
    assert(require('tower-graph') == graph);

    var topology = graph
      .select('posts')
      .select('comments')
      .where('comments.post_id').eq('posts.id');

    console.log(topology);
  });
});