'use strict';

angular.module('newappApp')
  .controller('ConceptsCtrl', function ($scope) {
    $scope.save = function(form) {
      $scope.submitted = true;
      console.log(form);
    }
  });
