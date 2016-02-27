var app = require('angular').module('app');

app.controller('AlertsController', function ($scope,$injector){
  var Alerts = $injector.get('Alerts');

  $scope.alerts     = Alerts.getAlerts();
  $scope.addAlert   = Alerts.addAlert;
  $scope.closeAlert = Alerts.closeAlert;

});
