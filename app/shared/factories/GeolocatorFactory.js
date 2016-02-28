var angular = require('angular');

angular.module('app').factory('GeolocatorFactory', ['$window','$rootScope', '$q', 
function($window,$rootScope,$q){
  var Geolocator = function(){};

  Geolocator.prototype.resolve = function(deferred,position){
    deferred.resolve(position);
  };

  Geolocator.prototype.reject = function(deferred,err){
    deferred.reject(err);
  };

  Geolocator.prototype.getCurrentPosition = function(){
    var deferred = $q.defer()
    var geo = $window.navigator.geolocation;
    if(!geo){
      var err = {code: 'status', message: 'Geolocation not supported'};
      this.reject(deferred,err);
      return deferred.promise;
    }
    geo.getCurrentPosition(this.resolve.bind(null,deferred), this.reject.bind(null,deferred));
    return deferred.promise;
  };

  return Geolocator;
}]);
