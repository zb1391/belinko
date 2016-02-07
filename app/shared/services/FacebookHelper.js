var app = require('angular').module('app');
var FB = require('fb');
var _ = require('lodash');

app.service('FacebookHelper',['$location','$q',
function($location,$q){
  var $helper = this;
  this.FB = FB;

  this.client_id = '561265827354748';
  this.client_secret = 'ebb4ed4353b0e928c0b1093daab7b8af';
  this.redirect_uri = 'http://localhost:4000/my-account';

  /**
   * make a request to the Facebook Api
   * @param { string } url
   * @param { object } options
   * @return { promise } promise
   */
  this.get = function(url,options){
    options = options || {};
    var deferred = $q.defer();
    var creds = {
      client_id:     $helper.client_id,
      client_secret: $helper.client_secret,
    };
    _.extend(options, creds);
    
    $helper.FB.api(url, options, $helper.onGet.bind(null,deferred));
    return deferred.promise;    
  };


  /**
   * resolve the Facebook Api GET request
   */
  this.onGet = function(deferred,response){
    if(!response || response.error){
      deferred.reject(response.error);
    }

    deferred.resolve(response);      
  };    

  /**
   * get the login url for the sign in button
   * @return { string }
   */
  this.getLoginUrl = function(){
    return $helper.FB.getLoginUrl({
      client_id:     $helper.client_id,
      client_secret: $helper.client_secret,
      redirectUri:   $helper.redirect_uri
    });
  };

  /**
   * request the access_token from facebook
   * @return { promise }
   */
  this.getToken = function(){
    var deferred = $q.defer();
    var options = {
      client_id:     $helper.client_id,
      client_secret: $helper.client_secret,
      redirect_uri:  $helper.redirect_uri,
      code:          $helper.getCode(),
    };

    return $helper.get('oauth/access_token',options);
  };

  /**
   * get the query code from the url
   * @return { string } query.code
   */
  this.getCode = function(){
    var query = $location.search() || {};
    return query.code || "";
  };


}]);
