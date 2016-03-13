var app = require('angular').module('app');
var _ = require('lodash');

app.service('MarkerHelper',['GoogleMapFactory',function(GoogleMapFactory){
  var self = this;

  /**
   * create a new Marker and add to Map
   * @param {Object} place
   * @return {Marker} marker
   *
   * place is a response from the api
   */
  this.addMarker = function(place){
    if(!self.isReady()) return;
    var marker = new GoogleMapFactory.google.maps.Marker({
      position: place.geometry.location,
    });
    marker.setMap(GoogleMapFactory.map);
    return marker;
  };


  /**
   * check if the GoogleMapFactory is ready
   * @return {boolean} isReady
   *
   * true if the factory has both map and google
   */
  this.isReady = function(){
    var factory = GoogleMapFactory;
    return factory.google && factory.map;
  };

}]);
