'use strict';

app.factory('Post', function($resource) {
  return $resource('https://luminous-fire-3416.firebaseio.com/posts/:id.json');
});