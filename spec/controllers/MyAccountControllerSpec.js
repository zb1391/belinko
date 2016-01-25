beforeEach(angular.mock.module("app"))

describe('MyAccountController',function(){
  var helper, location, scope;
  beforeEach(inject(function($controller,_FacebookHelper_, $rootScope){
    fb = _FacebookHelper_;
    spyOn(fb,'getToken');
    scope = $rootScope.$new();
    controller = $controller('MyAccountController', {$scope: scope});
  }));

  it('calls getToken',function(){
    expect(fb.getToken).toHaveBeenCalled();
  });

});
