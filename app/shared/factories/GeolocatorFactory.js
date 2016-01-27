var angular = require('angular');

angular.module('app').factory('GeolocatorFactory', ['$window','$rootScope', function($window,$rootScope){
  var Geolocator = function(){
    this.position = {};
    this.errors = {};
  };

  Geolocator.prototype.resolve = function(position){
    var coords = position.coords;

    this.position.latitude = coords.latitude;
    this.position.longitude = coords.longitude;
    $rootScope.$apply();
  };

  Geolocator.prototype.reject = function(err){
    this.error[err.code] = err.message;
    $rootScope.apply();
  };

  Geolocator.prototype.getCurrentPosition = function(){
    var geo = $window.navigator.geolocation;
    if(!geo){
      var err = {code: 'status', message: 'geolocation not supported'};
      this.reject(err);
      return;
    }

    geo.getCurrentPosition(this.resolve.bind(this), this.reject.bind(this));
  };

  return Geolocator;
}]);
