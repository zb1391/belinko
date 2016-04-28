beforeEach(angular.mock.module("app"));

describe('PlaceDetailHelper',function(){
  var PlaceDetailHelper,Alerts,scope;

  beforeEach(inject(function(_PlaceDetailHelper_,_Alerts_,$rootScope){
    PlaceDetailHelper = _PlaceDetailHelper_;
    Alerts = _Alerts_;
    scope = $rootScope.$new();
  }));

  describe('reviewSuccess',function(){
    var review,fn;
    beforeEach(function(){
      review = { id: 1 };
      scope.place = { belinko_reviews: [] };
      spyOn(Alerts,'addAlert');
      spyOn(PlaceDetailHelper,'reset').and.returnValue(function(){});
      PlaceDetailHelper.reviewSuccess(scope)({data: review});
    });

    it('appends the review to place.belinko_reviews',function(){
      expect(scope.place.belinko_reviews.length).toEqual(1);
    });

    it('adds an alert',function(){
      expect(Alerts.addAlert).toHaveBeenCalled();
    });

    it('calls PlaceDetailHelper.reset',function(){
      expect(PlaceDetailHelper.reset).toHaveBeenCalled();
    });
  });
});
