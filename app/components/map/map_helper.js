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


  // this is where i am currently stuck
  // it needs to call resize after the rendering
  // what is happening here is that the resize call is happening when the value changes
  // but it is calling it before the rendering of the new dimensions.
  // i should look for a way to watch the dimensions of of a div and when it changes
  // from 100% -> 50% or vice versa trigger the resize
  //
  // i think i can create a directive called map or something
  // and watch changes to the css class
  // http://stackoverflow.com/questions/21693064/monitor-for-class-changing-on-element-in-angularjs-directive
  this.resizeMap = function(newValue,oldValue){
    if(!newValue && newValue !== oldValue){
      var map = GoogleMapFactory.map;
      GoogleMapFactory.google.maps.event.trigger(map,'resize');
debugger;
    }
  }
}]);
