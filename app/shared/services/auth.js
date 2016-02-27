var _ = require('lodash');
var app = require('angular').module('app');


app.factory('auth', [
  '$window',
  function($window) {

    var auth = {};

    auth.currentUser = null;
    auth.isLoggedIn = false;

    auth.logIn = function(userParams) {
      var data = userParams.data;
      auth.currentUser = {
        username: data.name,
        token: data.token,
      };
      auth.isLoggedIn = true;

      $window.localStorage.currentUser = JSON.stringify(auth.currentUser);
    };


    auth.logOut = function() {
      auth.currentUser = null;
      auth.isLoggedIn = false;

      $window.localStorage.currentUser = "{}";
    };


    auth.setPermissions = function(permissions) {
      auth.currentUser.permissions = permissions;
      $window.localStorage.currentUser = Json.stringify(auth.currentUser);
    };


    auth.initUser = function(userParams) {
      auth.currentUser = JSON.parse($window.localStorage.currentUser || "{}");
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
