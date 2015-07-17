'use strict';

describe('Controller: ConceptsCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));

  var ConceptsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConceptsCtrl = $controller('ConceptsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
