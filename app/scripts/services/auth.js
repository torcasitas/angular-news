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
      //console.log('signedIn ' + !!Auth.user.provider);
      return !!Auth.user.provider;
    },

    waitForAuth: function() {
      return auth.$waitForAuth();
    },
    user: {}
  };

  auth.$onAuth(function(authData) {
    if (authData) {
      console.log('logged in ');
      angular.copy(authData, Auth.user);
      Auth.user.profile = $firebaseObject(ref.child('profile').child(Auth.user.uid));
      console.dir(Auth.user);

    } else {
      console.log('logged out');
      if (Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();
      }

      angular.copy({}, Auth.user);
      console.dir(Auth.user);
    }
  });

  return Auth;

});