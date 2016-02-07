var app = require('angular').module('app');
var _ = require('lodash');

var apiBase = 'localhost:3000/api/v1';
 
app.factory('Api', ['$http', '$resource',function($http, $resource) {

  return {

    /**
     * get a token from the api
     * @param { object } config includes the proper headers
     * @return { promise } promise
     */
    getToken: function(config) {
      return $http.post(apiBase + '/omniauth_callbacks/facebook/', config);
    },

  };
}]);

/**
 * make sure all requests have the proper headers
 *
 */
app.config(['$resourceProvider', '$httpProvider', function($resourceProvider, $httpProvider){
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
