'use strict';

angular.module('newappApp')
  .directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        if(scope.$last === true) {
          $timeout(function() {
            scope.$emit('onFinishedRender')
          });
        }
      }
    };
  });
