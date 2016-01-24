var app = require('angular').module('app');

app.config(function($routeProvider,$locationProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'partials/home.html',
      controller: 'HomeController',
    })
    .when('/my-account',{
      templateUrl: 'partials/my_account.html',
      controller: 'MyAccountController',
    })

    $locationProvider.html5Mode(true);
});
