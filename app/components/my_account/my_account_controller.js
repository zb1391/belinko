var app = require('angular').module('app');

app.controller('MyAccountController',MyAccountController);

function MyAccountController($scope,$injector){
  var FacebookHelper = $injector.get('FacebookHelper');
  FacebookHelper.getToken().then(function(resp){
    $scope.token = resp.access_token;
    $scope.expires = resp.expires || 0;
  });

  // TODO move to a helper
  $scope.$watch('token', function(newValue,oldValue){
    debugger;
    // what am i gonna do here?
    // i need to make a request to facebook/me
    // to get the email/username/uid
    // THEN i can make a request to belinko

    // then on success redirect to the maps page
    // this page should just be a loading screen
  });
};
