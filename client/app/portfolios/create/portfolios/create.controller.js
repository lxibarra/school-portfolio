'use strict';

angular.module('newappApp')
  .controller('PortfoliosCreateCtrl', function ($scope, $http, $routeParams) {


    $scope.portfolio = {};
    $scope.portfolio.status = true;
    $scope.bgwork = true;

    $scope.array = [];


    $http.get('api/concepts').then(function () {

      if ($routeParams.id) {
        $scope._id = $routeParams.id;

        var promise = $http.get('api/concepts').then(function (_data) {
          $scope.concepts = _data.data;
        });

        promise.then(function () {
          $http.get('api/portfolioss/' + $scope._id).then(function (data) {
            $scope.portfolio.course = data.data.course;
            $scope.portfolio.startDate = new Date(data.data.startDate);
            $scope.portfolio.endDate = new Date(data.data.endDate);
            $scope.portfolio.description = data.data.description;
            $scope.portfolio.status = data.data.active;

            angular.forEach(data.data.concepts, function (recordItem) {
              angular.forEach($scope.concepts, function (item) {
                if (recordItem.name === item.name) {
                  item.Selected = true;
                  $scope.array.push(recordItem);
                }
              });
            });
            $scope.bgwork = false;
          });
        });
      } else {
        $http.get('api/concepts').then(function (_data) {
          $scope.concepts = _data.data;
          $scope.bgwork = false;
        });
      }
    });

    $scope.save = function (form) {
      $scope.submitted = true;
      $scope.submitSuccess = false;
      $scope.submitError = false;
      $scope.form = form;
      $scope.bgwork = true;
      if (form.$valid && $scope.array.length > 0) {


        if ($scope._id) {
          $http.put('api/portfolioss/' + $scope._id, createModel())
            .success(saveSuccess)
            .catch(saveError);
        } else {
          $http.post('api/portfolioss/', createModel())
            .success(saveSuccess)
            .catch(saveError);
        }
      }
    };

    function saveError(a, b, c) {
      $scope.submitError = true;
      console.log(a, b, c);
      $scope.bgwork = false;
    }

    function saveSuccess() {
      $scope.entry = $scope.portfolio.course;
      $scope.submitSuccess = true;
      setTimeout(function () {
        $scope.$apply(function () {
          if (!$scope._id) {
            $scope.resetForm();
          } else {
            $scope.submitError = false;
            $scope.submitSuccess = false;
          }
        });
      }, 3000);
      $scope.bgwork = false;
    }

    function createModel() {
      return {
        course: $scope.portfolio.course,
        startDate: $scope.portfolio.startDate,
        endDate: $scope.portfolio.endDate,
        description: $scope.portfolio.description,
        active: $scope.portfolio.status ? true : false,
        concepts: $scope.array
      };
    }

    $scope.checkAll = function (preset) {

      var setter = typeof preset === 'undefined' ? ($scope.checkList ? true : false) : preset;
      if (setter) {
        $scope.array = $scope.concepts.slice();
      }
      else {
        $scope.array = [];
      }
      angular.forEach($scope.concepts, function (item) {
        item.Selected = setter;
      });


    };

    $scope.checkEach = function (evt, item) {
      if (evt.target.type === 'checkbox') {
        if (evt.target.checked) {
          $scope.array.push(item);
        }
        else {
          var c = 0, index = [];
          angular.forEach($scope.array, function (current) {
            if (current._id === item._id) {
              index.push(c);
            }
            c = c + 1;
          });
          if (index.length >= 0) {
            for (var i = index.length - 1; i >= 0; i--) {
              $scope.array.splice(index[i], 1);
            }
          }
        }
      }
    };

    $scope.resetForm = function () {
      $scope.submitError = false;
      $scope.submitSuccess = false;
      $scope.portfolio = {};
      $scope.submitted = false;
      $scope.form.$setPristine();
      $scope.checkAll(false);
      $scope.checkList = false;
      $scope.portfolio.status = true;
    };



  });
