var app = require('angular').module('app');
var fs = require('fs');

var templateHTML = fs.readFileSync('./public/directives/place_detail.html','utf8');
app.directive('placeDetail', ['PlaceDetailHelper','Api',
function(PlaceDetailHelper,Api){
  return {
    restrict: 'E',
    template: templateHTML,
    scope: {
        place: '=',
    },
    link: link(PlaceDetailHelper,Api),
  };
}]);

function link(helper,Api){
  return function($scope,elem,attrs){
    $scope.config = {
      showForm: false,
    };
    $scope.review = {
      would_recommend: true,
    };
    $scope.belinkoHeading = "";
    $scope.googleHeading = "";

    /*
     * reset the directive when the place changes
     */
    $scope.$watch('place.place_id',helper.reset($scope));

    $scope.submitReview = function(review){
      Api.addReview(review).then(function(resp){debugger;},function(resp,err){debugger;});
    };
  };
};
