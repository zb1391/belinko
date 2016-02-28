var app = require('angular').module('app');
var AuthenticatedController = require("../../shared/controllers/authenticated_controller.js");
var GoogleMapsLoader = require('google-maps'); 
GoogleMapsLoader.KEY = "AIzaSyChK3PkjgLlhcgXNUZOiLeseQwyL45jyYk"

app.controller('MapController',AuthenticatedController(MapController));

function MapController($scope,$injector){
  var el = document.getElementById('map');
  var options = {
    center: {lat: -34.397, lng: 150.644},
    zoom: 12 
  };
  GoogleMapsLoader.load(function(google){
    new google.maps.Map(el, options);
    $scope.$digest();
  });

  GoogleMapsLoader.onLoad(function(google) {
    console.log('I just loaded google maps api');
  });
};
