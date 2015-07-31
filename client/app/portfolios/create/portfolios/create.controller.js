'use strict';

angular.module('newappApp')
  .controller('PortfoliosCreateCtrl', function ($scope, $http, $routeParams, $filter) {


     $scope.portfolio = {};
     $scope.portfolio.status = true;
    //this will set the initial checked checkboxes
    $scope.array = []; //for updates i have to set the _id in the array for preselection
    //$scope.array_ = angular.copy($scope.array);

     $http.get('api/concepts').then(function(data) {

        if($routeParams.id) {
              $scope._id = $routeParams.id;

                var promise = $http.get('api/concepts').then(function(_data) {
                  $scope.concepts = _data.data;
                });

                promise.then(function() {
                    $http.get('api/portfolioss/' + $scope._id).then(function(data) {
                        $scope.portfolio.course = data.data.course;
                        $scope.portfolio.startDate = new Date(data.data.startDate);
                        $scope.portfolio.endDate = new Date(data.data.endDate);
                        $scope.portfolio.description = data.data.description;
                        $scope.portfolio.status = data.data.active;

                        angular.forEach(data.data.concepts, function(record_item) {
                               angular.forEach($scope.concepts, function(item) {
                                    if(record_item.name === item.name) {
                                      item.Selected  = true;
                                    }
                                });
                        });
                    });
                });
            } else {
              $http.get('api/concepts').then(function(_data) {
                $scope.concepts = _data.data;
              });
            }
     });

    $scope.save = function(form) {
      $scope.submitted = true;
      $scope.submitSuccess = false;
      $scope.submitError = false;
      $scope.form = form;
      if(form.$valid && $scope.array.length > 0) {

        $scope.submitSuccess = true;
        $http.post('api/portfolioss', createModel()).success(function(){
          $scope.entry = $scope.portfolio.course;
          $scope.submitSuccess = true;
          setTimeout(function() {
            $scope.$apply(function() {
              $scope.resetForm();

            });
          }, 3000)

        }).catch(function(e) {
          $scope.submitError = true;
          console.log(e);
        });
      }
      else {
        //$scope.submitError = true;
        //console.log(form.$valid);
      }
    };

    function createModel() {
      return {
        course: $scope.portfolio.course,
        startDate: $scope.portfolio.startDate,
        endDate: $scope.portfolio.endDate,
        description:$scope.portfolio.description,
        active: $scope.portfolio.status? true: false,
        concepts:$scope.array
      }
    }

    $scope.checkAll = function() {

        var setter = $scope.checkList? true : false;
        if(setter)
          $scope.array = $scope.concepts.slice();
        else
          $scope.array = [];
          angular.forEach($scope.concepts, function(item) {
              item.Selected  = setter;
          });

        console.log($scope.array);
    };

    $scope.checkEach = function(evt, item) {
        if(evt.target.type == "checkbox") {
          if(evt.target.checked)
            $scope.array.push(item);
          else {
              var index = $scope.array.indexOf(item);
              if(index >= 0)
                $scope.array.splice(index, 1);
          }
          console.log($scope.array);
        }
    };

    $scope.resetForm = function() {
      $scope.submitError = false;
      $scope.submitSuccess = false;
      $scope.portfolio = {};
      $scope.submitted = false;
      $scope.form.$setPristine();
    }

  });
