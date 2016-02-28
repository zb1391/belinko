/**
 * creates a controller function
 * @param {Function} controllerCallback
 * @return {Function}
 *
 * Always authenticates before continuing
 * redirects to home page if not logged in
 * 
 * controllerCallback receives the $scope and $injector
 */
var AuthenticatedController = function(controllerCallback){
  return function($scope,$injector){
    var auth      = $injector.get("auth");
    var $location = $injector.get("$location");
    var Alerts    = $injector.get("Alerts");

    auth.initUser();
    if(!auth.isLoggedIn){
      Alerts.addAlert({type: 'danger', msg: 'Please sign in before continuing.'});
      $location.url("/");
      return;
    }

    controllerCallback($scope,$injector);
  };
};

module.exports = AuthenticatedController;
