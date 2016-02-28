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
    .when('/login',{
      templateUrl: 'partials/login.html',
      controller: 'LoginController',
    })
    .when('/map',{
      templateUrl: 'partials/map.html',
      controller: 'MapController',
    })

    $locationProvider.html5Mode(true);
});
