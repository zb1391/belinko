var app = require('angular').module('app');
var _ = require('lodash');

var apiBase = 'http://localhost:3000/api';
 
app.factory('Api', ['$http', '$resource','FacebookHelper','$q','auth',function($http, $resource,FacebookHelper,$q,auth) {

  return {
    
    /**
     * get a token from the api
     * @param {Object} config includes the proper headers
     * @return {Promise} promise
     */
    login: function(code) {
      var deferred = $q.defer();
      $http.post(apiBase + '/users',{code: code}).then(
           onLogin.bind(null,deferred),
           onLogout.bind(null,deferred));
      return deferred.promise;
    },
  };

  /**
   * save the user credentials on login success
   * @param {Promise} deferred,
   * @param {Object} response
   */
  function onLogin(deferred,response){
    auth.logIn(response);
    deferred.resolve(response);
  };

  /**
   * log out of the system on login fail
   * @param {Promise} deferred,
   * @param {Object} response
   */
  function onLogout(deferred,response){
    auth.logOut();
    deferred.reject(response);
  };
}]);

/**
 * make sure all requests have the proper headers
 *
 */
app.config(['$resourceProvider', '$httpProvider', function($resourceProvider, $httpProvider){
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push(['$q', '$location', 'auth', '$rootScope', function($q, $location, auth, $rootScope) {
    return {
      'request': function (config) {
        if(config.url.indexOf(apiBase) === 0) {
          config.headers = config.headers || {};
          _.extend(config.headers,{"Accept": "application/vnd.belinko.v1"});

          if (auth.currentUser && auth.currentUser.token) {
            config.headers.Authorization = 'Token ' + auth.currentUser.token;
          }
        }
        return config;
      },
    };
  }]);
}]);
