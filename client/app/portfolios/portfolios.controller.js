'use strict';

angular.module('newappApp')
  .controller('PortfoliosCtrl', function ($scope, $http) {
    $http.get('api/portfolioss').then(function(data) {
      console.log(data);
      $scope.items = data.data;
    });
  });
