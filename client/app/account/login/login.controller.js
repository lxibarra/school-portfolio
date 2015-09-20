'use strict';

angular.module('newappApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};
    $scope.bgwork = false;

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.bgwork = true;
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
            $scope.bgwork =false;
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          if(err.disabled) {
            $location.path('/inactiveuser');
          }
          $scope.errors.other = err.message;
            $scope.bgwork = false;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
