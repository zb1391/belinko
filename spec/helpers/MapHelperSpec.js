beforeEach(angular.mock.module("app"))

describe('MapHelper',function(){
  var MapHelper, scope, Api;

  beforeEach(inject(function(_MapHelper_,_Api_,$rootScope){
    MapHelper = _MapHelper_;
    Api = _Api_;
    scope = $rootScope.$new();
  }));

  describe('getDetail',function(){
    var marker;

    beforeEach(function(){
      spyOn(Api,'placeDetail');
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
  });
});
