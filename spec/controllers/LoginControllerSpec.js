beforeEach(angular.mock.module("app"))

describe('LoginController',function(){
  var helper, location, scope, q, deferred, Api,LoginHelper, controller, ctrl, AlertsFactory;
  beforeEach(inject(function($controller,_FacebookHelper_, _Api_,$rootScope,$q,_LoginHelper_,_AlertsFactory_){
    q = $q;
    deferred = $q.defer();
    fb = _FacebookHelper_;
    Api = _Api_;
    LoginHelper = _LoginHelper_;
    AlertsFactory = _AlertsFactory_;
    scope = $rootScope.$new();
    controller = $controller;
    spyOn(LoginHelper,"loginFail");
    spyOn(LoginHelper,"loginSuccess");
  }));

  describe("when there is a token",function(){
    beforeEach(function(){
      spyOn(fb,'getCode').and.returnValue('abc-123');
      spyOn(Api,'login').and.returnValue(deferred.promise);
      ctrl = controller('LoginController',{$scope: scope});
    });

    it('calls login',function(){
      expect(Api.login).toHaveBeenCalled();
    }); 

    describe("and login succeeds",function(){
      beforeEach(function(){
        deferred.resolve({data: {name: "test user"}});
        scope.$apply();
      });

      it('calls loginSuccess',function(){
        expect(LoginHelper.loginSuccess).toHaveBeenCalled();
      });
    });

    describe('and login fails',function(){
      beforeEach(function(){
        deferred.reject({ data:{ errors:{ facebook:"test error" } } });
        scope.$apply();
      });

      it('calls loginFail',function(){
        expect(LoginHelper.loginFail).toHaveBeenCalled();
      });
    });
  });
});
