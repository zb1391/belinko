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

  /**
   * add the click listener to the marker
   * @param {Object} $scope
   * @param {Marker} marker
   *
   * the click event right now just toggles showDetail
   */
  this.addListeners = function($scope,marker){
    var map = GoogleMapFactory.map;
    marker.addListener('click', function(){
      $scope.$apply(function(){
        $scope.showDetail = true;
      });
      GoogleMapFactory.google.maps.event.trigger(map,'resize');
      map.panTo(marker.getPosition());
    });
  };

}]);
