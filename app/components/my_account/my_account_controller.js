var app = require('angular').module('app');

app.controller('MyAccountController',MyAccountController);

function MyAccountController($scope,$injector){
  var FacebookHelper = $injector.get('FacebookHelper');
  FacebookHelper.getToken();


  // TODO move to a helper
  $scope.$watch('token', function(newValue,oldValue){
    // what am i gonna do here?
    // i think what I want to do is this
    // once a token is set, save it somewhere like on the window or in a cookie
    // then make a request to belinko_api with the token

    // then on success redirect to the maps page
    // this page should just be a loading screen
  });
};
