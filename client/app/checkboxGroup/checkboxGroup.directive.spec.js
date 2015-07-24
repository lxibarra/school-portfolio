'use strict';

describe('Directive: checkboxGroup', function () {

  // load the directive's module
  beforeEach(module('newappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<checkbox-group></checkbox-group>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the checkboxGroup directive');
  }));
});