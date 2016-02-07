var app = require('angular').module('app');
var FB = require('fb');

app.service('FacebookHelper',['$location','$q',
function($location,$q){
  var $helper = this;
  this.FB = FB;

  this.client_id = '561265827354748';
  this.client_secret = 'ebb4ed4353b0e928c0b1093daab7b8af';
  this.redirect_uri = 'http://localhost:4000/my-account';

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

    $helper.FB.api('oauth/access_token', options, $helper.onToken.bind(null,deferred));
    return deferred.promise;
  };

  /**
   * resolve the promise from the getToken request
   */
  this.onToken = function(deferred,response){
    if(!response || response.error){
      deferred.reject(response.error);
    }

    deferred.resolve(response);
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
