
beforeEach(angular.mock.module("app"))

describe('FacebookHelper',function(){
  var helper, location, scope;
  beforeEach(inject(function(_FacebookHelper_, $location){
    helper = _FacebookHelper_;
    location = $location;
  }));
  
  describe('getLoginUrl',function(){
    it('calls FB.getLoginUrl',function(){
      spyOn(helper.FB,'getLoginUrl');
      helper.getLoginUrl();
      expect(helper.FB.getLoginUrl).toHaveBeenCalled();
    });
  });

  describe('getToken',function(){
    it('calls FB.api with the oath endpoint',function(){
      var scope = {};
      spyOn(helper.FB,'api');
      helper.getToken(scope);
      expect(helper.FB.api.calls.argsFor(0)[0]).toEqual('oauth/access_token');
    });
  });


  describe('onGet',function(){
    var deferred = {
      resolve: function(){},
      reject: function(){},
    };

    beforeEach(function(){
      spyOn(deferred,'resolve');
      spyOn(deferred,'reject');
    });

    describe('when there is no error',function(){
      it('sets calls deferred.resolve',function(){
        helper.onGet(deferred,{});
        expect(deferred.resolve).toHaveBeenCalled();
      });
    });

    describe('when there is an error', function(){
      it('calls deferred.reject',function(){
        helper.onGet(deferred,{error: true});
        expect(deferred.reject).toHaveBeenCalled();
      });
    });
  });

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
