var _ = require('lodash');
var app = require('angular').module('app');


app.factory('auth', [
  '$window',
  function($window) {

    var auth = {};

    auth.currentUser = null;
    auth.isLoggedIn = false;

    auth.logIn = function(userParams) {
      auth.currentUser = {
        username: userParams.user,
        token: userParams.token,
      };
      auth.isLoggedIn = true;

      $window.localStorage.currentUser = auth.currentUser;
    };


    auth.logOut = function() {
      auth.currentUser = null;
      auth.isLoggedIn = false;

      $window.localStorage.currentUser = {};
    };


    auth.setPermissions = function(permissions) {
      auth.currentUser.permissions = permissions;
      $window.localStorage.currentUser = auth.currentUser;
    };


    auth.initUser = function(userParams) {
      auth.currentUser = $window.localStorage.currentUser || {};
      if(auth.currentUser.token) {
        auth.isLoggedIn = true;
      }
      else {
        auth.isLoggedIn = false;
      }
    };

    return auth;
  }
]);
