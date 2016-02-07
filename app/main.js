require('angular')

var app = angular.module('app', [require('angular-route'), require('angular-resource')]);

// routing
require('./routes.js');


require('./shared/**/*.js', { mode: 'expand' });
require('./components/**/*.js', { mode: 'expand' });
