var app = require('angular').module('app');
var fs = require('fs');

var templateHTML = fs.readFileSync('./public/directives/place_detail.html','utf8');
app.directive('placeDetail', function(){
  return {
    restrict: 'E',
    template: templateHTML,
    scope: {
        place: '=',
    },
    link: link(),
  };
});

function link($scope,elem,attrs){
  return function($scope,elem,attrs){
    $scope.showForm = false;
    $scope.review = {};

    /*
     * reset the directive when the place changes
     */
    $scope.$watch('place.place_id',function(newValue,oldValue){
      if(newValue !== oldValue){
        $scope.review = {};
        $scope.showForm = false;
      }
    });
  };
};
