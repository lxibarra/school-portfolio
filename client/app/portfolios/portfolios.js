'use strict';

angular.module('newappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/portfolios', {
        templateUrl: 'app/portfolios/portfolios.html',
        controller: 'PortfoliosCtrl',
        authenticate:true
      });
  });
