var app = require('angular').module('app');

app.service('MapHelper',['Api',function(Api){
  var self = this;

  this.getDetail = function($scope,marker){
    $scope.$apply(function(){
      $scope.showDetail = true;
    });
    Api.placeDetail(marker.place.place_id);
  };

}]);
