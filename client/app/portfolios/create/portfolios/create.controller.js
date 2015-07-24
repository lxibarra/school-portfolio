'use strict';

angular.module('newappApp')
  .controller('PortfoliosCreateCtrl', function ($scope, $http) {
    $http.get('api/concepts').then(function(data) {
      $scope.concepts = data.data;
    }, function() {
      console.log('Error');
    });

    //this will set the initial checked checkboxes
    $scope.array = []; //for updates i have to set the _id in the array for preselection
    $scope.array_ = angular.copy($scope.array);

    $scope.nada = function() {
      console.log($scope.array);
      return $scope.array.toString();
      //return Math.random();
    };

    $scope.save = function() {
      console.log($scope.array);
    }

  });
