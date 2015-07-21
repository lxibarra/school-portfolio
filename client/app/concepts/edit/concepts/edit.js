'use strict';

angular.module('newappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/concepts/edit/:id', {
        templateUrl: 'app/concepts/create/concepts/create.html',
        controller: 'ConceptsCreateCtrl'
      });
  });
