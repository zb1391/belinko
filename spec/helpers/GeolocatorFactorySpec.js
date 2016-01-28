beforeEach(angular.mock.module("app"))

describe('GeolocatorFactory',function(){
  var geoloc, window, scope;

  beforeEach(inject(function(_GeolocatorFactory_, $window){
    geoloc = new _GeolocatorFactory_();
    window = $window;
  }));

  describe('getCurrentPosition',function(){
    describe('when there is no geolocation',function(){
      beforeEach(function(){
        window.navigator.geolocation = false;
      });

      it('sets the error object',function(){
        geoloc.getCurrentPosition();
        expect(geoloc.errors.status).toEqual('Geolocation not supported');
      });
    });

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
    beforeEach(function(){
      geoloc.resolve({coords: {latitude: '123', longitude: '456'}});
    });

    it('sets position.latitude',function(){
      expect(geoloc.position.latitude).toEqual('123');
    });

    it('sets longitude',function(){
      expect(geoloc.position.longitude).toEqual('456');
    });
  });

  describe('reject',function(){
    beforeEach(function(){
      geoloc.reject({code: '1', message: 'test'});
    });

    it('sets errors[code]',function(){
      expect(geoloc.errors['1']).toEqual('test');
    });
  });
});
