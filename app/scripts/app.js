/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name angPollApp
 * @description
 * # angPollApp
 *
 * Main module of the application.
 */

var app = angular
  .module('angPollApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
