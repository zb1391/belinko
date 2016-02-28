beforeEach(angular.mock.module("app"))

describe('GeolocatorFactory',function(){
  var geoloc, window, scope;

  beforeEach(inject(function(_GeolocatorFactory_, $window){
    geoloc = new _GeolocatorFactory_();
    window = $window;
  }));

  describe('getCurrentPosition',function(){
    describe('when there is geolocation',function(){
      beforeEach(function(){
        window.navigator.geolocation = {};
        window.navigator.geolocation.getCurrentPosition = function(){};
        spyOn(window.navigator.geolocation, 'getCurrentPosition');
      });

      it('calls navigator.geolocation.getCurrentPosition',function(){
        geoloc.getCurrentPosition();
        expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
      });

    });
  });

  describe('resolve',function(){
    var deferred = {resolve: function(position){}};
    beforeEach(function(){
      spyOn(deferred,'resolve');
      geoloc.resolve(deferred,{coords: {latitude: '123', longitude: '456'}});
    });

    it('calls deferred.resolve',function(){
      expect(deferred.resolve).toHaveBeenCalled();
    });
  });

  describe('reject',function(){
    var deferred = {reject: function(error){}};
    beforeEach(function(){
      spyOn(deferred,'reject');
      geoloc.reject(deferred,{code: '1', message: 'test'});
    });

    it('sets deferred.reject',function(){
      expect(deferred.reject).toHaveBeenCalled();
    });
  });
});
