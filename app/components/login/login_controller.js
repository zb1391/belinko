var app = require('angular').module('app');

app.controller('LoginController',LoginController);

function LoginController($scope,$injector){
  var FacebookHelper = $injector.get('FacebookHelper');
  var Api            = $injector.get('Api');
  var $location      = $injector.get('$location');
  var Alerts         = $injector.get('Alerts');

  var code = FacebookHelper.getCode();
  if(!code){
    Alerts.addAlert({type: 'danger', msg: 'Failed to log in'});
    $location.url("/");
    return;
  };

  Api.login(FacebookHelper.getCode()).then(function(response){
    debugger;
  });
};
