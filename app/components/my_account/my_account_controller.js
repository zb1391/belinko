var app = require('angular').module('app');
var AuthenticatedController = require("../../shared/controllers/authenticated_controller.js");

app.controller('MyAccountController',AuthenticatedController(MyAccountController));

function MyAccountController($scope,$injector){
  debugger;
};
