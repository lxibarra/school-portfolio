'use strict';

angular.module('newappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/concepts/create', {
        templateUrl: 'app/concepts/create/concepts/create.html',
        controller: 'ConceptsCreateCtrl',
        authenticate: true
      });
  });
