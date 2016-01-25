var app = require('angular').module('app');

app.controller('MyAccountController',MyAccountController);

function MyAccountController($scope,$injector){
  var FacebookHelper = $injector.get('FacebookHelper');
  FacebookHelper.getToken()

};
