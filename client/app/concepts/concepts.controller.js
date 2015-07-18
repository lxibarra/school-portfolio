'use strict';

angular.module('newappApp')
  .controller('ConceptsCtrl', function ($scope, $http) {
    $scope.save = function(form) {
      $scope.submitted = true;
      $scope.success = false;
      $scope.error = false;
      if(form.$valid) {
        $http.post('api/concepts',
          {
            name:$scope.concept.title,
            info:$scope.concept.description,
            active:$scope.concept.status
          }).then(function() {
              $scope.last_saved = $scope.concept.title;
              $scope.success = true;
              //$scope.concept.title = "";
            /*console.log(form);
            form.$setUntouched();*/
              $scope.form.$setPristine();


          }).catch(function() {
              $scope.error = true;
          });


      }
    }
  });
