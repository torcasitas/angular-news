'use strict';

app.controller('NavCtrl', function ($scope, $location, Post, Auth) {

  console.log('navctrl');
  console.dir(Auth);
  $scope.user = Auth.user;
  $scope.signedIn = Auth.signedIn;
  $scope.logout = Auth.logout;

  $scope.submitPost = function () {
    Post.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
      $scope.post = {url: 'http://', title: ''};
    });
  };

});