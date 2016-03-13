beforeEach(angular.mock.module('app'));
var stubbedGoogle = require('../support/google_stub.js');
var stubbedMap = {};

describe('MarkerHelper',function(){
  var MarkerHelper, scope, GoogleMapFactory;

  beforeEach(inject(function(_MarkerHelper_,_GoogleMapFactory_){
    MarkerHelper = _MarkerHelper_;
    GoogleMapFactory = _GoogleMapFactory_;
  }));

  describe('isReady',function(){
    it('returns false when there is no map or google',function(){
      expect(MarkerHelper.isReady()).toEqual(false);
    });

    it('returns true when there is map and google',function(){
      GoogleMapFactory.map = true;
      GoogleMapFactory.google = true;
      expect(MarkerHelper.isReady()).toEqual(true);
    });
  });

  describe('addMarker',function(){
    var place;
    beforeEach(function(){
      GoogleMapFactory.google = stubbedGoogle;
      GoogleMapFactory.map = stubbedMap;
      place = { geometry: { location: {} } };
    });

    it('returns an object with a place',function(){
      var marker = MarkerHelper.addMarker(place);
      expect(marker.place).toEqual(place);
    });

    it('returns an object with a marker',function(){
      var marker = MarkerHelper.addMarker(place);
      expect(!!marker.marker).toEqual(true);
    });
  });
});
