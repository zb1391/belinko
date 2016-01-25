var app = require('angular').module('app');

app.service('FacebookHelper',['$location',
function($location){
  var $helper = this;

  this.extractCode = function(){
    var code = "";
    var query = $location.search || "";
    var match = query.match(/code=(([\w,-]{1,}))/g);
    if(match) code = match[0].split("=")[1];
    return code;
  };


}]);
