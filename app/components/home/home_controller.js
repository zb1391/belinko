var app = require('angular').module('app');

app.controller('HomeController',HomeController);

function HomeController($scope,$injector){
  var FacebookHelper = $injector.get('FacebookHelper');

  $scope.loginUrl = FacebookHelper.getLoginUrl();

};
