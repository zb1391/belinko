
beforeEach(angular.mock.module("app"))

describe('FacebookHelper',function(){
  var helper, location;
  beforeEach(inject(function(_FacebookHelper_, $location){
    helper = _FacebookHelper_;
    location = $location;
  }));
  
  describe('extractCode',function(){
    describe('when code is present in search',function(){
      beforeEach(function(){
        location.search="?code=test123&another=812312"
      });

      it('parses code from location.search',function(){
        expect(helper.extractCode()).toEqual("test123");
      });
    });

    describe('when the code is not present',function(){
      beforeEach(function(){
        location.search="?another=123";
      });

      it('returns an empty string',function(){
        expect(helper.extractCode()).toEqual('');
      });
    });
  });
});
