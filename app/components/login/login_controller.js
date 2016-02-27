var app = require('angular').module('app');

app.controller('LoginController',LoginController);

function LoginController($scope,$injector){
  var FacebookHelper = $injector.get('FacebookHelper');
  var Api            = $injector.get('Api');
  var $location      = $injector.get('$location');

  var code = FacebookHelper.getCode();
  if(!code){
    console.log("Code is required");
    $location.url("/");    
  };

  Api.login(FacebookHelper.getCode()).then(function(response){
    debugger;
  });
};
