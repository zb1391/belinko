var app = require('angular').module('app');
var fs = require('fs');

var templateHTML = fs.readFileSync('./public/directives/place_detail.html','utf8');
app.directive('placeDetail', function(){
  return {
    restrict: 'E',
    template: templateHTML,
    scope: {
        place: '=?',
    },
    link: function(scope, element, attrs) {
console.log('test');
    },
  };
});
