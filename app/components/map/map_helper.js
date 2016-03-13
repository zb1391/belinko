var app = require('angular').module('app');
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = "AIzaSyChK3PkjgLlhcgXNUZOiLeseQwyL45jyYk"

app.service('MapHelper',['Alerts','$location','GoogleMapFactory',
function(Alerts,$location,GoogleMapFactory){
  var self = this;

  /**
   * builds options to render google maps
   * @param {Object} position
   * @return {Object} options
   *
   * position must have a coords object
   * that has lat/lng keys
   */
  this.buildOptions = function(position){
    var coords = position.coords;
    var options = {
      zoom: 16,
      center: {
        lat: coords.latitude,
        lng: coords.longitude,
      },
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}]

    };

    return options;
  };

  /**
   * renders the Google Map
   * @param {Object} position
   *
   * position must have a coords object
   * that has lat/lng keys
   *
   */
  this.loadMap = function(position){
    var el = document.getElementById('map');
    var options = self.buildOptions(position);
    GoogleMapsLoader.load(function(google){
      GoogleMapFactory.map = new google.maps.Map(el,options);
      GoogleMapFactory.google = google;
    });
  };

  /**
   * handles google maps error geo locator
   * flashes an error and redirects to my-account
   */
  this.loadMapError = function(){
    Alerts.addAlert({ type: 'danger', msg:'Failed to load Google Maps'});
    $location.url('/my-account');
  };
}]);
