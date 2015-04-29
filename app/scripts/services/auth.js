'use strict';

app.factory('Auth', function ($firebaseAuth, $firebaseObject,  md5, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    register: function (user) {
      return auth.$createUser(user);
    },

    createProfile: function (user) {
      var profile = {
        username: user.username,
        md5_hash: md5.createHash(user.username || '')
      };

      var profileRef = $firebaseObject(ref.child('profile').child(user.uid));
      profileRef.$value = profile;
      return profileRef.$save();
    },

    login: function (user) {
      return auth.$authWithPassword(user);
    },

    logout: function () {
      auth.$unauth();
    },

    resolveUser: function() {
      return !!Auth.user.provider;
    },

    signedIn: function() {
      return !!Auth.user.provider;
    },
    user: {}
  };

  $rootScope.$on('$firebaseAuth:onAuth', function (authData) {
    if (authData) {
      console.log('logged in ');
      angular.copy(authData, Auth.user);
    } else {
      console.log('logged out');
      angular.copy({}, Auth.user);
    }
  });

  return Auth;

});