'use strict';

angular.module('newappApp')
  .directive('backgroundMover', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
          scope.element = element;
      },
      controller:function($scope) {
        $scope.fire = function(evt) {

          //make it move after a few seconds have pass of mouse move and animated
          var percentageX = Math.round((evt.pageX / this.element[0].clientWidth) * 100);
          var percentageY = Math.round((evt.pageY / this.element[0].clientHeight) * 100);
          this.element[0].style.backgroundPosition = percentageX + "% " + percentageY + "%";
        }
      }
    };
  });
