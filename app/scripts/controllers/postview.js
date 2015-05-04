'use strict';

app.controller('PostViewCtrl', function($scope, $routeParams, Post) {
  var postPromise = Post.get($routeParams.postId);

  postPromise.then(function(post) {
    $scope.post = post;
  });
});