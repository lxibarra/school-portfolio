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
    //$scope.array_ = angular.copy($scope.array);
      
    $scope.nada = function() {
      console.log($scope.array);
      return $scope.array.toString();
      //return Math.random();
    };

    $scope.save = function(form) {
      $scope.submitted = true;
      $scope.submitSuccess = false;
      $scope.submitError = false;
      
      if(form.$valid) {
        $scope.submitSuccess = true;
        console.log($scope.array);
      }
      else {
        $scope.submitError = true;
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
    }
    
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
    }
    
    

  });
