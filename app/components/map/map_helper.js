var app = require('angular').module('app');

app.service('MapHelper',['Api','GoogleMapFactory',function(Api,GoogleMapFactory){
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

  /**
   * unset the scope place
   * @param {Scope} scope
   */ 
  this.closePlace = function($scope){
    return function(){
      $scope.showDetail = false;
    };
  };

  /**
   * resize the map if the new and old value are different
   * @param newValue
   * @param oldValue
   *
   */
  this.resizeMap = function(newValue,oldValue){
    var map = GoogleMapFactory.map;
    if(map && newValue !== oldValue){
      GoogleMapFactory.google.maps.event.trigger(map,'resize');
    }
  }
}]);
