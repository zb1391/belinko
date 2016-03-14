beforeEach(angular.mock.module("app"));
var GoogleMapsLoader = require('google-maps');

describe('MapLoader',function(){
  var MapLoader, Alerts, location;
  beforeEach(inject(function(_MapLoader_,_Alerts_,$location){ 
    MapLoader = _MapLoader_;
    Alerts = _Alerts_;
    location = $location;
  }));

  describe('buildOptions',function(){
    var position = { coords: {latitude: '123', longitude: '456'} };
    var options;
    beforeEach(function(){
      options = MapLoader.buildOptions(position);      
    });

    it('sets zoom',function(){
      expect(options.zoom).toEqual(16);
    });

    it('sets center',function(){
      var expected = {lat: '123', lng: '456'};
      expect(options.center).toEqual(expected);
    });
  });
});
