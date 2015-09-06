'use strict';

angular.module('newappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/inactiveuser', {
        templateUrl: 'app/inactiveuser/inactiveuser.html',
        controller: 'InactiveuserCtrl'
      });
  });
