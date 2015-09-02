'use strict';

angular.module('newappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/portfolios/attachments/:id', {
        templateUrl: 'app/portfolios/attachments/portfolios/attachments.html',
        controller: 'PortfoliosAttachmentsCtrl',
        authenticate:true
      });
  });
