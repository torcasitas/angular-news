'use strict';

app.controller('PostViewCtrl', function ($scope, $routeParams, Post) {
  var post = Post.get($routeParams.postId);

  post.then(function(obj) {
    console.log('obj ' + obj);
    console.dir(obj);
  });

});