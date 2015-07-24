'use strict';

angular.module('newappApp')
  .controller('PortfoliosCreateCtrl', function ($scope, $http) {
    $http.get('api/concepts').then(function(data) {
      $scope.concepts = data.data;  
    }, function() {
      console.log('Error');
    });
    
    $scope.save = function() {
      console.log($scope);
    }
  });
