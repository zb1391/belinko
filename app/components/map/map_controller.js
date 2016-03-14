var app = require('angular').module('app');
var _ = require('lodash');
var AuthenticatedController = require("../../shared/controllers/authenticated_controller.js");
var GoogleMapsLoader = require('google-maps'); 
GoogleMapsLoader.KEY = "AIzaSyChK3PkjgLlhcgXNUZOiLeseQwyL45jyYk"

app.controller('MapController',AuthenticatedController(MapController));

function MapController($scope,$injector){
  var Geolocator   = $injector.get('GeolocatorFactory');
  var MapLoader    = $injector.get('MapLoader');
  var Api          = $injector.get('Api');
  var MarkerHelper = $injector.get('MarkerHelper');
  var MapHelper    = $injector.get('MapHelper');

  $scope.geo = new Geolocator();
  var promise = $scope.geo.getCurrentPosition();

  $scope.markers = [];
  $scope.showDetail = false;

  // load the map
  promise.then(MapLoader.loadMap,MapLoader.loadMappError);

  promise.then(function(position){
    var options = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    Api.radarSearch(options).then(function(response){
      _.forEach(response.data.places,function(place){
        var marker = MarkerHelper.addMarker(place);
        MarkerHelper.onClick(marker,MapHelper.getDetail.bind(null,$scope));
        $scope.markers.push(marker);
      });
    });
  });
};
