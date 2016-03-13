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

  var $scope.geo = new Geolocator();
  var promise = $scope.geo.getCurrentPosition();

  $scope.markers = [];

  // load the map
  promise.then(MapHelper.loadMap,MapHelper.loadMappError);

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
