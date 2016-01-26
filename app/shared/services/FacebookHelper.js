var app = require('angular').module('app');
var FB = require('fb');

app.service('FacebookHelper',['$location',
function($location){
  var $helper = this;
  this.FB = FB;

  this.client_id = '561265827354748';
  this.client_secret = 'ebb4ed4353b0e928c0b1093daab7b8af';
  this.redirect_uri = 'http://localhost:4000/my-account';

  // return the login url for the sign in button
  this.getLoginUrl = function(){
    return $helper.FB.getLoginUrl({
      client_id:     $helper.client_id,
      client_secret: $helper.client_secret,
      redirectUri:   $helper.redirect_uri
    });
  };

  // make a request to get the access_token
  this.getToken = function($scope){
    var options = {
      client_id:     $helper.client_id,
      client_secret: $helper.client_secret,
      redirect_uri:  $helper.redirect_uri,
      code:          $helper.getCode(),
    };

    $helper.FB.api('oauth/access_token', options, $helper.onToken.bind(null,$scope));
  };

  // sets the scope token and expires
  this.onToken = function($scope,response){
    if(!response || response.error){
      console.log(!response ? 'error' : response.error);
    }

    $scope.token = response.access_token;
    $scope.expires = response.expires || 0;
  };

  // extract code from the url
  this.getCode = function(){
    var query = $location.search() || {};
    return query.code || "";
  };


}]);
