require('angular')

var app = angular.module('app', [require('angular-route')]);

// routing
require('./routes.js');


require('./components/**/*.js', { mode: 'expand' });
