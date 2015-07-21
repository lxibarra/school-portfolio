'use strict';

describe('Controller: ConceptsEditCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));

  var ConceptsEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConceptsEditCtrl = $controller('ConceptsEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
