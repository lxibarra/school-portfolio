'use strict';

describe('Controller: PortfoliosCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));

  var PortfoliosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PortfoliosCtrl = $controller('PortfoliosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
