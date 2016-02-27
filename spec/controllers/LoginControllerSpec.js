beforeEach(angular.mock.module("app"))

describe('LoginController',function(){
  var helper, location, scope, q, deferred, Api, location, controller, ctrl;
  beforeEach(inject(function($controller,_FacebookHelper_, _Api_,$rootScope,$q,$location){
    q = $q;
    deferred = $q.defer();
    fb = _FacebookHelper_;
    Api = _Api_;
    location = $location;
    scope = $rootScope.$new();
    controller = $controller;
  }));

  describe("when there is no token",function(){
    beforeEach(function(){
      spyOn(fb,'getCode').and.returnValue(null);
      ctrl = controller('LoginController', {$scope: scope});
    });

    it('sets the path back to the root',function(){
      expect(location.path()).toEqual('/');
    });    
  });

  describe("when there is a token",function(){
    beforeEach(function(){
      spyOn(fb,'getCode').and.returnValue('abc-123');
      spyOn(Api,'login').and.returnValue(deferred.promise);
      ctrl = controller('LoginController',{$scope: scope});
    });

    it('calls login',function(){
      expect(Api.login).toHaveBeenCalled();
    }); 
  });
});
