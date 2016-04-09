var app = require('angular').module('app');
var fs = require('fs');

var templateHTML = fs.readFileSync('./public/directives/belinko_reviews.html','utf8');

app.directive('belinkoReviews',[ function(){
  return {
    restrict: 'E',
    template: templateHTML,
    scope: {
      reviews: '=',
      showForm: '=',
    },
    link: link(),
  };
}]);

function link(){
  return function($scope, elem, attrs){

  };
};
