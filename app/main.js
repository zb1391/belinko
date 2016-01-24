require('angular')

var app = angular.module('app', [])

require('./components/**/*.js', { mode: 'expand' });
