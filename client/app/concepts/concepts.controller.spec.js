'use strict';

describe('Controller: ConceptsCtrl', function () {

  // load the controller's module
  beforeEach(module('newappApp'));
  var ConceptsCtrl,
    scope = {},
    backend;

  beforeEach(angular.mock.inject(function($httpBackend){
    backend = $httpBackend;
    backend.expect("GET", 'api/concepts').respond(
      [{
        _id: "55e67ddbbef8a709057671e6",
        name: "Introduction",
        info: "sample",
        active: true,
        owner: "user1@doitfy.com",
        __v: 0
      },
        {
          _id: "55e67e54302deb1305d80a28",
          name: "Resume",
          info: "Sample",
          active: true,
          owner: "test@test.com",
          __v: 0
        },
        {
          _id:"55e67fe2147ddb36050d88c3",
          name: "Examn topics",
          info: "just for fun",
          active: true,
          owner: "someone@doitfy.com",
          __v: 0
        }]
    );
  }));

  // Initialize the controller and a mock scope
  beforeEach(angular.mock.inject(function ($controller, $rootScope, $http) {
    scope = $rootScope.$new();
    ConceptsCtrl = $controller('ConceptsCtrl', {
      $scope: scope,
      $http: $http
    });

    backend.flush();
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
