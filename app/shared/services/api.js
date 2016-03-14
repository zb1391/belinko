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

    /**
     * perform a belinko nearby search
     * @param {Object} options
     * @return {Promise}
     *
     * options include
     *   latitude  - lat coord
     *   longitude - lng coord
     *   radius - radius to search for
     *   keyword
     *   name
     *   opennow - bool for open or closed
     *   zagatselected - bool for zagat selected places
     */
    nearbySearch: function(options){
      return $http({
        url: apiBase + '/google_places/nearby_search',
        method: 'GET',
        params: options,
      });
    },

    /**
     * perform a belinko radar search
     * @param {Object} options
     * @return {Promise}
     *
     * options include
     *   latitude - lat coord
     *   longitude - lng coord
     *   radius - radius to search for
     *   types
     *   keyword
     *   name
     *   opennow - bool for open or closed
     *   zagatselected - bool for zagar selected places
     */ 
    radarSearch: function(options){
      return $http({
        url: apiBase + '/google_places/radar_search',
        method: 'GET',
        params: options
      });
    },

    /**
     * get a place detail
     * @param {Integer} id
     */
    placeDetail: function(id){
      return $http({
        url: apiBase + '/google_places/detail',
        method: 'GET',
        params: { id: id }
      });
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
