'use strict';

angular.module('newappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tryout', {
        templateUrl: 'app/tryout/tryout.html',
        controller: 'TryoutCtrl'
      });
  });
