'use strict';
//http://jsfiddle.net/zargyle/t7kr8/
angular.module('newappApp')
  .directive("checkboxGroup", function () {
    return {
      restrict: "A",
      link: function (scope, elem, attrs) {
        // Determine initial checked boxes
        var field = attrs.datavalue;
        if (scope.array.indexOf(scope.item[field]) !== -1) {
          elem[0].checked = true;
        }

        // Update array on click
        elem.bind('click', function () {

          var index = scope.array.indexOf(scope.item[field]);
          // Add if checked
          if (elem[0].checked) {
            if (index === -1) scope.array.push(scope.item[field]);
          }
          // Remove if unchecked
          else {
            if (index !== -1) scope.array.splice(index, 1);
          }
          // Sort and update DOM display
          scope.$apply(scope.array.sort(function (a, b) {
            return a - b
          }));
        });
      }
    }
  });
