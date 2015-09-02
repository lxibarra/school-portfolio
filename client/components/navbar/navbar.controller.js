'use strict';

angular.module('newappApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {


    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route, reg) {
      if (!reg) {
        return route === $location.path();
      } else {
        var routes = RegExp(route, 'i');
        return routes.test($location.path());
      }
    };
  });
