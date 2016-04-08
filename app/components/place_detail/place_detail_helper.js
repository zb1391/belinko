var app = require('angular').module('app');

app.service('PlaceDetailHelper',[function(){
  var self = this;

  /**
   * reset the scope to its original status
   * @param {Scope} $scope
   */
  this.reset = function($scope){
    return function(newValue,oldValue){
      if(newValue !== oldValue){
        $scope.review = {};
        $scope.showForm = false;
        $scope.belinkoHeading = self.belinkoHeading($scope.place);
        $scope.googleHeading = self.googleHeading($scope.place);
        $scope.active = 0;
      }
    };
  };

  /**
   * get the heading for the belinko reviews tab
   * @param {Object} place
   * @return {String}
   */
  this.belinkoHeading = function(place){
    return "Belinko Reviews ("+place.belinko_reviews.length+")";
  };

  /**
   * get the heading for the google reviews tab
   * @param {Object} place
   * @return {String}
   */
  this.googleHeading = function(place){
    return "Google Reviews ("+place.reviews.length+")";
  };
}]);
