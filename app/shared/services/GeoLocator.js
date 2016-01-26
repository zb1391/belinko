var angular = require('angular');

angular.module('app').service('GeoLocator', ['$window', function($window){
  this.position = {};
  this.errors = {};

  // set the position
  this.resolve = function(position){
    var coords = position.coords;
    
    this.position.latitude = coords.latitude;
    this.position.longitude = coords.longitude; 
  };

  // set the errors
  this.reject = function(err){
    this.errors[err.code] = err.message;
  };

  // request the users geolocation 
  this.getCurrentPosition = function(){
    if(!$window.navigator.geolocation){
      this.errors['status'] = 'Geolocation not supported'; 
      return;
    }

    $window.navigator.getCurrentPosition(this.resolve, this.reject);
  };
}]);
