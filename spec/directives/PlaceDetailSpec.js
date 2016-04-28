var _ = require('lodash');
beforeEach(angular.mock.module("app"));
var getCompiledElement = require('../support/getCompiledElement.js');
var place; 

var elem = '<place-detail place="place"></place-detail>';
describe("placeDetail",function(){
  var element, scope, isolate,q,deferred,AlertsFactory;

  beforeEach(inject(function($rootScope, $compile,$q,_Api_,_AlertsFactory_){
    q = $q;
    deferred = $q.defer();
    Api = _Api_;
    AlertsFactory = _AlertsFactory_;
    place = {
      name: 'test',
      gid: '1',
      reviews: [],
      belinko_reviews: [],
      geometry: {
        location: {
          lat: '123',
          lng: '456',
        }
      },
    };
    scope = $rootScope.$new();
    scope.place = place;
    element = getCompiledElement(angular,$compile,scope,elem);
    isolate = element.scope().$$childHead;
  }));

  it('initializes scope.config,showForm to false',function(){
    expect(isolate.config.showForm).toEqual(false);
  });

  it('initializes scope.review',function(){
    expect(isolate.review).toEqual({ would_recommend: true });
  });

  describe('when place.place_id changes',function(){
    beforeEach(function(){
      isolate.review.comment = "test";
      isolate.config.showForm = true;
      isolate.place.place_id = "123";
      isolate.$digest();
    });

    it('resets the review object',function(){
      expect(isolate.review.would_recommend).toEqual(true);
    });

    it('sets showForm to false',function(){
      expect(isolate.config.showForm).toEqual(false);
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

  describe('scope.submitReview',function(){
    beforeEach(function(){
      spyOn(Api,'saveReview').and.returnValue(deferred.promise);
      isolate.submitReview({comment: 'test'});
    });

    it('calls Api.saveReview',function(){
      expect(Api.saveReview).toHaveBeenCalled();
    });

    describe('when successful',function(){
      var review;
      beforeEach(function(){
        review = { id: 1, comment: 'test' };
        deferred.resolve({data: review});
        scope.$apply();
      });

      it('adds to the isolate.belinko_reviews array',function(){
        expect(isolate.place.belinko_reviews[0]).toEqual(review);
      });

      it('adds a success Alert',function(){
        expect(AlertsFactory[0].type).toEqual('success');
      });

      it('sets showForm to false',function(){
        expect(isolate.config.showForm).toEqual(false);
      });
    });
  });
});
