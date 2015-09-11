'use strict';

angular.module('newappApp')
  .controller('SignupCtrl', function ($scope, User, $location, $window) {

    $scope.user = {};
    $scope.errors = {};



    $scope.register = function(form) {
      $scope.submitted = true;
      $scope.errors = {};
      if(form.$valid && angular.element('#g-recaptcha-response').val().length > 0) {
        //trigger loading visuals
        User.save({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          reCaptcha: angular.element('#g-recaptcha-response').val()
        }, function() {
          $location.path('/inactiveuser');
        }, function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });

          angular.forEach(err.captcha, function(error, field) {
            $scope.errors['reCaptcha'] = error;
          });
        });
      } else {
        $scope.errors['reCaptcha'] = "Olvido validar el recuadro superior.";
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

  });
