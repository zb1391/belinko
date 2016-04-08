var app = require('angular').module('app');
var fs = require('fs');

var templateHTML = fs.readFileSync('./public/directives/google_reviews.html','utf8');

app.directive('googleReviews',[ function(){
  return {
    restrict: 'E',
    template: templateHTML,
    scope: {
      reviews: '=',
    },
    link: link(),
  };
}]);

function link(){
  return function($scope, elem, attrs){

  };
};
