var app = require('angular').module('app');
var _ = require('lodash');
var AuthenticatedController = require("../../shared/controllers/authenticated_controller.js");
var GoogleMapsLoader = require('google-maps'); 
GoogleMapsLoader.KEY = "AIzaSyChK3PkjgLlhcgXNUZOiLeseQwyL45jyYk"

app.controller('MapController',AuthenticatedController(MapController));

function MapController($scope,$injector){
  var Geolocator   = $injector.get('GeolocatorFactory');
  var MapHelper    = $injector.get('MapHelper');
  var Api          = $injector.get('Api');
  var MarkerHelper = $injector.get('MarkerHelper');

  var geo = new Geolocator();
  var promise = geo.getCurrentPosition();

  $scope.markers = [];

  // load the map
  promise.then(
    MapHelper.loadMap.bind(null,$scope),
    MapHelper.loadMappError
  );

  // get radar markers
  // need a loading screen
  // i think i should initially show only markers
  // for places that have reviews
  // then you can search for other places with a text bar
  // i have refined the radius to be smaller
  // but i would like it to be dynamic to the viewport of the map
  // so if you are zoomed out, you have a larger radius
  promise.then(function(position){
    var options = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    Api.radarSearch(options).then(function(response){
      _.forEach(response.data.places,function(place){
        var marker = MarkerHelper.addMarker(place);
        $scope.markers.push(marker);
      });
    });
  });
};
