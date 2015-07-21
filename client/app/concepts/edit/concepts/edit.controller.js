'use strict';

angular.module('newappApp')
  .controller('ConceptsEditCtrl', function ($scope, $routeParams, $http, $timeout, $filter) {
/*
    var SearchPromise;
    $scope._id = undefined;
    $scope.concept = {};
    $scope.concept.status = true;
    $scope.bgwork = false;

    if($routeParams.id) {
      $scope._id = $routeParams.id;
      //must show a loading message
      $scope.bgwork = true;
      $http.get('api/concepts/' + $scope._id).success(function(data) {
          $scope.concept.title = data.name;
          $scope.concept.description = data.info;
          $scope.concept.status = data.active||false;
      }).then(function() {
        $scope.bgwork = false;
      });
    }

    $scope.save = function(form) {
      $scope.submitted = true;
      $scope.submitSuccess = false;
      $scope.submitError = false;

      if(form.$valid) {
        $scope.bgwork = true;
        $http.put('api/concepts/' + $scope._id, {
          name:$scope.concept.title,
          info:$scope.concept.description,
          active:$scope.concept.status? true : false
        }).success(function() {
          $scope.entry = $scope.concept.title;
          $scope.submitSuccess = true;
          setTimeout(function() {
            $scope.$apply(function(){
              $scope.submitSuccess = false;
              if(!$scope._id)
              $scope.resetForm();
            });

          }, 3000);
        }).catch(function() {
          $scope.submitError = true;
        }).then(function() {
          $scope.bgwork = false;
        });
      }
    };

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
            if($scope._id) {
              $scope.repeated = $filter('exclude')(data, '_id', $scope._id);
            }
            else {
              $scope.repeated = data.data;
            }
        });
      }, 2000);
    };
    */
  });
