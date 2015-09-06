'use strict';

angular.module('newappApp')
  .controller('SignupCtrl', function ($scope, User, $location, $window) {

    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {

        User.save({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        }, function() {
          $location.path('/inactiveuser');
        });
        /*
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        }, function() { })
        .then( function() {
          // Account created, redirect to destiny
            console.log('Executed then');
          $location.path('/inactiveuser');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });*/
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

  });
