var app = require('angular').module('app');

app.controller('LoginController',LoginController);

function LoginController($scope,$injector){
  var FacebookHelper = $injector.get('FacebookHelper');
  var Api            = $injector.get('Api');
  var helper    = $injector.get('LoginHelper');

  /*
   * login and redirect appropriately
   */
  Api.login(FacebookHelper.getCode()).then(helper.loginSuccess,helper.loginFail);
};
