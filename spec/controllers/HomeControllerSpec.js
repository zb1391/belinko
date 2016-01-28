beforeEach(angular.mock.module("app"))

describe('HomeController',function(){
  var helper, location, scope;
  beforeEach(inject(function($controller,_FacebookHelper_, $rootScope){
    fb = _FacebookHelper_;
    scope = $rootScope.$new();
    controller = $controller('HomeController', {$scope: scope});
  }));

  it('sets scope.loginUrl',function(){
    expect(!!scope.loginUrl).toEqual(true);
  });

});
