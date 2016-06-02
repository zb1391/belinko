beforeEach(angular.mock.module("app"));
var getCompiledElement = require('../support/getCompiledElement.js');
var elem = '<div map show="show" id="map"></div>';
var show = false;

describe('map',function(){
  var element, scope, isolate, MapHelper;
  
  beforeEach(inject(function($rootScope,$compile, _MapHelper_){
    scope = $rootScope.$new();
    scope.show=show;
    MapHelper = _MapHelper_;

    element = getCompiledElement(angular,$compile,scope,elem);
    isolate = element.scope().$$childHead;
  }));

  describe('when scope.show changes to true',function(){
    beforeEach(function(){
      spyOn(MapHelper,'resizeMap');
      isolate.show = true;
      isolate.$digest();
    });

    it('adds the class to the element',function(){
      expect(element.hasClass('half-width')).toEqual(true);
    });

    it('calls MapHelper.resizeMap',function(){
      expect(MapHelper.resizeMap).toHaveBeenCalled();
    });
  });

  describe('when scope.show changes to false',function(){
    beforeEach(function(){
      // change it and digest twice so it is actually a change
      isolate.show = true;
      isolate.$digest();
      isolate.show = false;
      spyOn(MapHelper,'resizeMap');
      isolate.$digest();
    });

    it('removes the class to the element',function(){
      expect(element.hasClass('half-width')).toEqual(false);
    });

    it('calls MapHelper.resizeMap',function(){
      expect(MapHelper.resizeMap).toHaveBeenCalled();
    });
  });
});
