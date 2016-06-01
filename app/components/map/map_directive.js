var app = require('angular').module('app');

app.directive('map',['MapHelper',function(MapHelper){
  return {
    restrict: 'A',
    scope: {
      detail: '@',
    },
    link: link(MapHelper),
  };
}]);

function link(MapHelper){
  return function($scope,elem,attr){

  };
};
