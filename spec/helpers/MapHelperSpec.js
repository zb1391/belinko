beforeEach(angular.mock.module("app"));
var GoogleMapsLoader = require('google-maps');

describe('MapHelper',function(){
  var MapHelper, Alerts, location;
  beforeEach(inject(function(_MapHelper_,_Alerts_,$location){ 
    MapHelper = _MapHelper_;
    Alerts = _Alerts_;
    location = $location;
  }));

  describe('buildOptions',function(){
    var position = { coords: {latitude: '123', longitude: '456'} };
    var options;
    beforeEach(function(){
      options = MapHelper.buildOptions(position);      
    });

    it('sets zoom',function(){
      expect(options.zoom).toEqual(15);
    });

    it('sets center',function(){
      var expected = {lat: '123', lng: '456'};
      expect(options.center).toEqual(expected);
    });
  });
});
