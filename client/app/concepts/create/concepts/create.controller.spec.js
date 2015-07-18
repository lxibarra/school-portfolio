'use strict';

describe('Controller: ConceptsCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));

  var ConceptsCreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConceptsCreateCtrl = $controller('ConceptsCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
