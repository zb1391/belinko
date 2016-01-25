var app = require('angular').module('app');
var FB = require('fb');

app.service('FacebookHelper',['$location',
function($location){
  var $helper = this;

  this.client_id = '561265827354748';
  this.client_secret = 'ebb4ed4353b0e928c0b1093daab7b8af';

  // TODO write tests
  this.getLoginUrl = function(){
    return FB.getLoginUrl({
      client_id: $helper.client_id,
      client_secret: $helper.client_secret,
      redirectUri: 'http://localhost:4000/my-account',
    });
  };

  // TODO write tests
  this.getToken = function(){
    FB.api('oauth/access_token', {
      client_id: $helper.client_id,
      client_secret: $helper.client_secret,
      redirect_uri: 'http://localhost:4000/my-account',
      code: $helper.getCode()
    }, function (res) {

      // TODO this function on success should make a request to my api
      // to the omniauth callback endpoint
      debugger;
      if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
      }

      var accessToken = res.access_token;
      var expires = res.expires ? res.expires : 0;
    });
  };

  // extract code from the url
  this.getCode = function(){
    var query = $location.search() || {};
    return query.code || "";
  };


}]);
