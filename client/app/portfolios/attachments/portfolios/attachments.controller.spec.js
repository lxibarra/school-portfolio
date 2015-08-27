'use strict';

describe('Controller: PortfoliosAttachmentsCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));

  var PortfoliosAttachmentsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PortfoliosAttachmentsCtrl = $controller('PortfoliosAttachmentsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
