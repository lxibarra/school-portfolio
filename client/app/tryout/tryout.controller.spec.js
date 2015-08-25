'use strict';

describe('Controller: TryoutCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));

  var TryoutCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TryoutCtrl = $controller('TryoutCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
