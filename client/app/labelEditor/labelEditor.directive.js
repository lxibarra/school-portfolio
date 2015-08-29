'use strict';

angular.module('newappApp')
  .directive('labelEditor', function () {
    return {
      restrict: 'A',
      template:'<div></div>',
      replace:true,
      link: function (scope, element, attrs) {

        var defaultClass = attrs.defaultClass||'label-editor';
        var editorClass = attrs.editorClass||'form-control';

        function enableDisableEdit(val) {
          if(val) {
            input.removeClass(defaultClass);
            input.addClass(editorClass);
          } else {
            input.addClass(defaultClass);
            input.removeClass(editorClass);
          }
        }

        // data-data* attributes and make a json element to pass to enterAction
        var attregx = /^data/i,
            args = {};

        Object.keys(attrs).forEach(function(prop) {
          if(prop.match(attregx)) {
              //remove data word and lowercase the first letter
              args[prop.replace('data', '').charAt(0).toLowerCase() + prop.replace('data', '').slice(1)] = attrs[prop];
          }
        });

        var input = angular.element('<input/>'), originalValue = '';
        input.attr('type', 'text');
        input.val(attrs.label);
        element.append(input);
        enableDisableEdit(false);


        element.on('click', function() {
          originalValue = input.val();
          enableDisableEdit(true);
        });

        input.on('blur', function() {
          enableDisableEdit(false);
        });

        input.on('keydown', function(evt) {

          if(evt.keyCode === 13) {
            //Save to the database
            scope[attrs.enterAction](input, args);
            input.blur();
            enableDisableEdit(false);
          }

          if(evt.keyCode === 27) {
            input.val(originalValue);
            input.blur();
            enableDisableEdit(false);
          }

        });

      }
    };
  });
