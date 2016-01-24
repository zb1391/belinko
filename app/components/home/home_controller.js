var app = require('angular').module('app');

app.controller('HomeController',HomeController);

function HomeController($scope,$injector){
  $scope.message = "hello world";
};
