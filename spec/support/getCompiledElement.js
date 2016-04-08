/**
 * compile a directive element
 * @param {Angular} angular
 * @param {$compile} compile
 * @param {$scope} scope
 * @param {String} elem
 */
module.exports = function(angular,compile,scope,elem){
  var compiledDirective = compile(angular.element(elem))(scope);
  scope.$digest();
  return compiledDirective;
};
