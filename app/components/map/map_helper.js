var app = require('angular').module('app');

app.service('MapHelper',['Api',function(Api){
  var self = this;

  /**
   * get the detail of a place
   * @param {Scope} scope
   * @param {Object} marker
   *
   * marker is a customer object created by the MarkerHelper
   * need to surround in a $scope.$apply because the event is 
   * registered outside of the scope.
   * 
   * this is used in the onClick of a marker
   */
  this.getDetail = function($scope,marker){
    $scope.$apply(function(){
      $scope.showDetail = true;
    });
    Api.placeDetail(marker.place.place_id).then(function(resp){
      $scope.place = resp.data.place;
    });
  };

}]);
