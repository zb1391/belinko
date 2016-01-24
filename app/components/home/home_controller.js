var app = require('angular').module('app');
var FB = require('fb');

app.controller('HomeController',HomeController);

function HomeController($scope,$injector){
  $scope.loginUrl = FB.getLoginUrl({
    client_id: '561265827354748', 
    client_secret: 'ebb4ed4353b0e928c0b1093daab7b8af',
    redirectUri: 'http://localhost:4000/my-account',
  });

};
