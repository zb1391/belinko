var app = require('angular').module('app');

app.service('Alerts',['AlertsFactory',function(AlertsFactory){
  var self = this;

  /**
   * get the alerts array
   * @return {Array} AlertsFactory
   */ 
  this.getAlerts = function(){
    return AlertsFactory;
  };

  /**
   * add to the alerts array
   * @param {Object} obj
   *
   * obj should include msg and type attributes
   * type one of ["success","danger","info","warning"]
   */ 
  this.addAlert = function(obj){
    AlertsFactory.push(obj);
  };

  /**
   * remove an alert from the alerts array
   * @param {Integer} index
   *
   * removes arrays[index]
   */
  this.closeAlert = function(index){
    AlertsFactory.splice(index,1);
  };
}]);
