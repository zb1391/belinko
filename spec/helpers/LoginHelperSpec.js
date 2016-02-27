beforeEach(angular.mock.module("app"))

describe('LoginHelper',function(){
  var LoginHelper, AlertsFactory, location;
  beforeEach(inject(function(_LoginHelper_,_AlertsFactory_,$location){
    LoginHelper = _LoginHelper_;
    AlertsFactory = _AlertsFactory_;
    location = $location;
  }));

  describe('loginSuccess',function(){
    beforeEach(function(){
      LoginHelper.loginSuccess({data:{name: 'test user'}});
    });

    it('adds an alert',function(){
      var a = AlertsFactory[AlertsFactory.length-1];
      var expected = {type: 'info', msg: 'Welcome to Belinko test user!'};
      expect(a).toEqual(expected);    
    });

    it('redirects to /my-account',function(){
      expect(location.path()).toEqual('/my-account');
    });
  });

  describe('loginError',function(){
    beforeEach(function(){
      LoginHelper.loginFail({data:{errors:{facebook: 'test error'}}});
    });

    it('adds an alert',function(){
      var a = AlertsFactory[AlertsFactory.length-1];
      var expected = {type: 'danger', msg: 'test error'};
      expect(a).toEqual(expected);
    });

    it('redirects to /',function(){
      expect(location.path()).toEqual('/');
    });
  });
});
