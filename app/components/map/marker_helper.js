var app = require('angular').module('app');
var _ = require('lodash');

app.service('MarkerHelper',['GoogleMapFactory',function(GoogleMapFactory){
  var self = this;

  /**
   * create a new Marker and add to Map
   * @param {Object} place
   * @return {Object} marker
   *
   * place is a response from the api
   * the return object has a reference to a marker and the place
   */
  this.addMarker = function(place){
    var marker = {}; 
    if(!self.isReady()) return;
    marker.marker = new GoogleMapFactory.google.maps.Marker({
      position: place.geometry.location,
    });
    marker.marker.setMap(GoogleMapFactory.map);
    marker.place = place;
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
    return !!(factory.google && factory.map);
  };

  /**
   * add a click listener to a marker
   * @param {Object} Marker
   * @param {Function} clickFn
   *
   * on click trigger map resize and panTo position
   */
  this.onClick = function(marker,clickFn){
    var map = GoogleMapFactory.map;
    marker.marker.addListener('click',function(){
      clickFn();
      GoogleMapFactory.google.maps.event.trigger(map,'resize');
      map.panTo(marker.marker.getPosition());
    });
  };
}]);
