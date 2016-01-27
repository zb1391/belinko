var app = require('angular').module('app');

app.controller('HomeController',HomeController);


function HomeController($scope,$injector){
  var FacebookHelper = $injector.get('FacebookHelper');
  var Geolocator = $injector.get('GeolocatorFactory');
  
  $scope.geo = new Geolocator();
  $scope.loginUrl = FacebookHelper.getLoginUrl();

  $scope.geo.getCurrentPosition();
};
