'use strict';

app.factory('Post', function($firebaseArray, $firebaseObject, $q, FIREBASE_URL) {
  //var ref = new Firebase(FIREBASE_URL);
  var postsRef = new Firebase(FIREBASE_URL + 'posts');
  var posts = $firebaseArray(postsRef);
  var Post;

  posts.$loaded().then(function(data) { 
    posts = data;
  });

  Post = {
    all: posts,
    create: function (post) {
      return posts.$add(post);
    },
    get: function (postId) {
      if (posts.length > 0) {
        var deferred = $q.defer();
        var post = posts.$getRecord(postId);
        deferred.resolve(post);

        return deferred.promise;
      } else {
        var postRef = new Firebase(postsRef + '/' + postId);
        var postObj = $firebaseObject(postRef);

        return postObj.$loaded();
      }
    },
    delete: function(postId) {
      return posts.$remove(postId);
    }
  }
  return Post;



  //return Post;
});