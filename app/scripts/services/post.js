'use strict';

app.factory('Post', function($firebaseArray, FIREBASE_URL) {
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
      // return $firebaseArray(postsRef).$getRecord(postId);
      return posts.$getRecord(postId);
    },
    delete: function(postId) {
      return posts.$remove(postId);
    }
  }
  return Post;



  //return Post;
});