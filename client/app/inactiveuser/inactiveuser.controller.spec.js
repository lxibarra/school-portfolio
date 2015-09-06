'use strict';

describe('Controller: InactiveuserCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));

  var InactiveuserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InactiveuserCtrl = $controller('InactiveuserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
