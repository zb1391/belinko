var angular = require('angular');

angular.module('app').factory('GeolocatorFactory', ['$window','$rootScope', function($window,$rootScope){
  var Geolocator = function(){
    this.position = {};
    this.errors = {};
  };

  Geolocator.prototype.resolve = function(position){
    var $this = this;
    $rootScope.$apply(function(){
      var coords = position.coords;

      $this.position.latitude = coords.latitude;
      $this.position.longitude = coords.longitude;
    });
  };

  Geolocator.prototype.reject = function(err){
    var $this = this;
    $rootScope.$apply(function(){
      $this.errors[err.code] = err.message;
    });
  };

  Geolocator.prototype.getCurrentPosition = function(){
    var geo = $window.navigator.geolocation;
    if(!geo){
      var err = {code: 'status', message: 'Geolocation not supported'};
      this.reject(err);
      return;
    }

    geo.getCurrentPosition(this.resolve.bind(this), this.reject.bind(this));
  };

  return Geolocator;
}]);
