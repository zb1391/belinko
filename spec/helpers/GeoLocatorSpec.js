beforeEach(angular.mock.module("app"))

describe('GeoLocator',function(){
  var geoloc, window, scope;
  beforeEach(inject(function(_GeoLocator_, $window){
    geoloc = _GeoLocator_;
    window = $window;
  }));

  describe('getCurrentPosition',function(){
    describe('when there is no geolocation',function(){
      beforeEach(function(){
        window.navigator.geolocation = false;
      });

      it('sets the errors object',function(){
        geoloc.getCurrentPosition();
        expect(geoloc.errors.status).toEqual('Geolocation not supported');
      });
    });

    describe('when there is geolocation',function(){
      beforeEach(function(){
        window.navigator.geolocation = true;
        window.navigator.getCurrentPosition = function(){};
        spyOn(window.navigator,'getCurrentPosition');
      });

      it('calls navigator.getCurrentPosition',function(){
        geoloc.getCurrentPosition();
        expect(window.navigator.getCurrentPosition).toHaveBeenCalled();
      });

      it('has resolve and reject as callbacks',function(){
        var expected = [geoloc.resolve, geoloc.reject];
        geoloc.getCurrentPosition();
        var args = window.navigator.getCurrentPosition.calls.argsFor(0);
        expect(args).toEqual(expected);
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
});
