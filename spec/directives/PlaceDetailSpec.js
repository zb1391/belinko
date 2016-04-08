beforeEach(angular.mock.module("app"));
var getCompiledElement = require('../support/getCompiledElement.js');
var place;

var elem = '<place-detail place="place"></place-detail>';
describe("placeDetail",function(){
  var element, scope, isolate;

  beforeEach(inject(function($rootScope, $compile){
    place = {reviews: [],belinko_reviews: []};
    scope = $rootScope.$new();
    scope.place = place;
    element = getCompiledElement(angular,$compile,scope,elem);
    isolate = element.scope().$$childHead;
  }));

  it('initializes scope.showForm to false',function(){
    expect(isolate.showForm).toEqual(false);
  });

  it('initializes scope.review',function(){
    expect(isolate.review).toEqual({ would_recommend: true });
  });

  describe('when place.place_id changes',function(){
    beforeEach(function(){
      isolate.review.comment = "test";
      isolate.showForm = true;
      isolate.place.place_id = "123";
      isolate.$digest();
    });

    it('resets the review object',function(){
      expect(isolate.review).toEqual({ would_recommend: true });
    });

    it('sets showForm to false',function(){
      expect(isolate.showForm).toEqual(false);
    });

    it('sets the belinkoHeading',function(){
      var expected = "Belinko Reviews (0)";
      expect(isolate.belinkoHeading).toEqual(expected);
    });

    it('sets the googleHeading',function(){
      var expected = "Google Reviews (0)";
      expect(isolate.googleHeading).toEqual(expected);
    });
  });
});
