
beforeEach(angular.mock.module("app"))

describe('FacebookHelper',function(){
  var helper, location;
  beforeEach(inject(function(_FacebookHelper_, $location){
    helper = _FacebookHelper_;
    location = $location;
  }));
  
  describe('getCode',function(){
    describe('when code is present in search',function(){
      beforeEach(function(){
        spyOn(location,'search').and.returnValue({code: 'test123'});
      });

      it('parses code from location.search',function(){
        expect(helper.getCode()).toEqual("test123");
      });
    });

    describe('when the code is not present',function(){
      beforeEach(function(){
        spyOn(location,'search').and.returnValue({});
      });

      it('returns an empty string',function(){
        expect(helper.getCode()).toEqual('');
      });
    });
  });
});
