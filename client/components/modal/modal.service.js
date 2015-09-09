'use strict';

angular.module('newappApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass, template) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';
      var tpl = template || 'remove';

      angular.extend(modalScope, scope);

      var templates = {
        remove: 'components/modal/modal.html',
        updatePassword: 'components/modal/updatePassword.html'
      };
      return $modal.open({
        templateUrl: templates[tpl],
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function (del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args[0].name,
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirmar Eliminación',
                html: '<p>Esta seguro que desea borrar al usuario <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Borrar',
                  click: function (e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancelar',
                  click: function (e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function (event) {
              del.apply(event, args);
            });
          };
        },
        errorNotification:function(fn) {
          fn = fn || angular.noop;
          return function() {
            var args = Array.prototype.slice.call(arguments),
              title = args[0] || 'Error',
              message = args[1];
            var errorNotificationModal = openModal({
              modal: {
                dismissable: true,
                title: title,
                html: '<p>' + message + '</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'OK',
                  click: function (e) {
                    errorNotificationModal.close(e);
                  }
                }]
              }
            }, 'modal-danger');
            errorNotificationModal.result.then(function(event) {
              fn.apply(event, args);
            });
          }
        },
        updatePassword: function (fn) {
          fn = fn || angular.noop;

          return function () {
            var args = Array.prototype.slice.call(arguments),
              user = args[0],
              updatepassModal,
              submitted = false,
              newCredentials = {
                error:false
              };

            updatepassModal = openModal({
              modal: {
                dismissable: true,
                title: 'Cambiar contraseña',
                html: '<p>Capture y confirme la nueva contraseña para <strong>' + user.name + '</strong>.</p>',
                user:user,
                credentials:newCredentials,
                buttons: [{
                  classes: 'btn-primary',
                  text: 'Actualizar',
                  click: function (e) {
                    submitted = true;
                    if(typeof newCredentials.pass !== 'undefined' &&
                      newCredentials.pass === newCredentials.passconfirm &&
                      newCredentials.pass.length >=3
                    ) {

                      args.push(newCredentials);
                      updatepassModal.close(e);
                    } else {
                      newCredentials.error = true
                    }
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancelar',
                  click: function (e) {
                    updatepassModal.dismiss(e);
                  }
                }
                ]
              }
            }, 'modal-primary', 'updatePassword');

            updatepassModal.result.then(function(event) {
              fn.apply(event, args);
            });
          }
        }
      }
    };
  });
