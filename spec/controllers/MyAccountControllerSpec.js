beforeEach(angular.mock.module("app"))

describe('MyAccountController',function(){
  var helper, location, scope, q, deferred;
  beforeEach(inject(function($controller,_FacebookHelper_, $rootScope,$q){
    q = $q;
    deferred = $q.defer();
    fb = _FacebookHelper_;
    spyOn(fb,'getToken').and.returnValue(deferred.promise);
    scope = $rootScope.$new();
    controller = $controller('MyAccountController', {$scope: scope});
  }));

  it('calls getToken',function(){
    expect(fb.getToken).toHaveBeenCalled();
  });

});
