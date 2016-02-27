require('angular')
require('angular-bootstrap-npm')

var app = angular.module('app', [
  require('angular-route'), 
  require('angular-resource'),
  'ui.bootstrap'
]);

// routing
require('./routes.js');


require('./shared/**/*.js', { mode: 'expand' });
require('./components/**/*.js', { mode: 'expand' });
