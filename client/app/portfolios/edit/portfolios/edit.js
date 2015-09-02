'use strict';

angular.module('newappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/portfolios/edit/:id', {
        templateUrl: 'app/portfolios/create/portfolios/create.html',
        controller: 'PortfoliosCreateCtrl',
        authenticate:true
      });
  });
