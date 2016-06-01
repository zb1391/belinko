beforeEach(angular.mock.module("app"))

describe('MapHelper',function(){
  var MapHelper, scope, Api, q,deferred;

  beforeEach(inject(function(_MapHelper_,_Api_,$rootScope,$q){
    MapHelper = _MapHelper_;
    Api = _Api_;
    scope = $rootScope.$new();
    q = $q;
    deferred = q.defer();
  }));

  describe('getDetail',function(){
    var marker;

    beforeEach(function(){
      spyOn(Api,'placeDetail').and.returnValue(deferred.promise);
      marker = {place: {place_id: '123'}};
      MapHelper.getDetail(scope,marker);
      scope.$digest();
    });

    it('sets scope.showDetail',function(){
      expect(scope.showDetail).toEqual(true);
    });

    it('makes a request to the Api for the place detail',function(){
      expect(Api.placeDetail).toHaveBeenCalled();
    });

    describe('when the response is resolved',function(){
      var resp;
      beforeEach(function(){
         resp = {data: { place: {place_id: '123'} } };
         deferred.resolve(resp);
         scope.$apply();
      });

      it('sets scope.place',function(){
        expect(scope.place).toEqual(resp.data.place);
      });
    });
  });

  describe("closePlace",function(){
    var fn;
    beforeEach(function(){
      scope.place = {};
      fn = MapHelper.closePlace(scope);
    });

    it('sets scope.showDetail to false',function(){
      fn();
      expect(scope.showDetail).toEqual(false);
    });
  });
});
