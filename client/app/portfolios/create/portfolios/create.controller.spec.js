'use strict';

describe('Controller: PortfoliosCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));

  var PortfoliosCreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PortfoliosCreateCtrl = $controller('PortfoliosCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
