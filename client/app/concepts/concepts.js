'use strict';

angular.module('newappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/concepts', {
        templateUrl: 'app/concepts/concepts.html',
        controller: 'ConceptsCtrl'
      });
  });
