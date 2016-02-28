var app = require('angular').module('app');
var _ = require('lodash');
var AuthenticatedController = require("../../shared/controllers/authenticated_controller.js");
var GoogleMapsLoader = require('google-maps'); 
GoogleMapsLoader.KEY = "AIzaSyChK3PkjgLlhcgXNUZOiLeseQwyL45jyYk"

app.controller('MapController',AuthenticatedController(MapController));

function MapController($scope,$injector){
  var Geolocator = $injector.get('GeolocatorFactory');
  var MapHelper  = $injector.get('MapHelper');

  var geo = new Geolocator();
  geo.getCurrentPosition().then(
    MapHelper.loadMap.bind(null,$scope),
    MapHelper.loadMappError
  );
};
