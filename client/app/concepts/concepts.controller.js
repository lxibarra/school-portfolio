'use strict';

angular.module('newappApp')
  .controller('ConceptsCtrl', function ($scope, $http, $timeout ) {
    
    var SearchPromise;
    
    $scope.save = function(form) {
      $scope.submitted = true;
      $scope.submitSuccess = false;
      $scope.submitError = false;
     
      if(form.$valid) {
        $scope.submitError = false;
        $http.post('api/concepts', {
          name:$scope.concept.title,
          info:$scope.concept.description,
          active:$scope.concept.status
        }).then(function() {
            $scope.entry = $scope.concept.title;
            $scope.submitSuccess = true;
            setTimeout(function() {
                $scope.$apply(function(){
                  $scope.submitSuccess = false;
                  $scope.resetForm(); 
                });
               
            }, 3000);
        }).catch(function() {
            $scope.submitError = true;
        });
      }
    }
    
    $scope.resetForm = function ()
    {
      $scope.submitError = false;
      $scope.submitSuccess = false;
      $scope.concept = {};
      $scope.form.$setPristine();
    };
    
    $scope.findSimilar = function(name) {
       if(SearchPromise) {
         $timeout.cancel(SearchPromise);
       }
       SearchPromise = $timeout(function() {
          $http.get('api/concepts/byname/' + name).then(function(data) {
            console.log(data);
            $scope.repeated = data.data;
          });
        }, 2000);
    };
    
  });
