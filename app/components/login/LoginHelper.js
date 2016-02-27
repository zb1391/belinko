var app = require('angular').module('app');

app.service('LoginHelper',['$location','Alerts',function($location,Alerts){
  var self = this;

  this.loginSuccess = function(response){
    $location.url('/my-account');
    response = response || {};
    var data = response.data || {};
    var msg = "Welcome to Belinko";
    if(data.name){
      msg = msg + " " + data.name + "!";
    }
    else {
     msg = msg +"!"; 
    }

    Alerts.addAlert({type: 'info', msg: msg});
  };

  /**
   * flash error and redirect home
   * @param {Object} response
   *
   * flashes response.data.errors.facebook
   * or "Failed to log in"
   */
  this.loginFail = function(response){
    $location.url('/');
    response = response || {};
    var data = response.data || {};
    var error = data.errors || {};
    var msg = error.facebook || "Failed to log in";
    Alerts.addAlert({type: 'danger', msg: msg});
  };
}]);
