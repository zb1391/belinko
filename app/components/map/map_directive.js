var app = require('angular').module('app');

app.directive('map',['MapHelper',function(MapHelper){
  return {
    restrict: 'A',
    scope: {
      show: '=',
    },
    link: link(MapHelper),
  };
}]);

function link(MapHelper){
  return function($scope,elem,attr){
    $scope.$watch('show',function(newValue,oldValue){
      if(newValue === true){
        elem.addClass('half-width');
      } else {
        elem.removeClass('half-width');
      }
      MapHelper.resizeMap(newValue,oldValue);
    }); 
  };
};
