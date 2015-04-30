'use strict';

app.controller('PostsCtrl', function(currentAuth,  $scope, $location, Post) {
  $scope.posts = Post.all;
  $scope.post = {url: 'http://', title: ''};

  $scope.user = currentAuth;
  $scope.signedId = !!currentAuth.provider;
  $scope.logout = currentAuth.logout;

  $scope.deletePost = function(post) {
    Post.delete(post);
  };

});