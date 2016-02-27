beforeEach(angular.mock.module("app"))

describe('LoginController',function(){
  var helper, location, scope, q, deferred, Api, location, controller, ctrl, AlertsFactory;
  beforeEach(inject(function($controller,_FacebookHelper_, _Api_,$rootScope,$q,$location,_AlertsFactory_){
    q = $q;
    deferred = $q.defer();
    fb = _FacebookHelper_;
    Api = _Api_;
    location = $location;
    AlertsFactory = _AlertsFactory_;
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

    it('adds an alert',function(){
      var a = AlertsFactory[AlertsFactory.length-1];
      var expected = {type: 'danger', msg: 'Failed to log in'};
      expect(a).toEqual(expected);
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
