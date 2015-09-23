'use strict';

angular.module('newappApp')
  .controller('PortfoliosAttachmentsCtrl', function ($scope, $http, $routeParams, FileUploader, s3Bucket, $cookieStore, $window, Modal) {

    //currently using tryout endpoint need to remove
    $scope.s3Bucket = s3Bucket;

    function ErrorNotification(title, message) {
      Modal.confirm.errorNotification(angular.noop)
      (title, message);
    }


    function onAfterAddingFile(fileItem) {
      angular.element('.' + fileItem.uploader.domElement).toggleClass('hide');
      fileItem.upload();
    }

    function onSuccessItem(fileItem, response, status, headers) {
      angular.element('.' + fileItem.uploader.domElement).toggleClass('hide');

    }

    function onCompleteItem(fileItem, response, status, headers) {
      //console.log('onCompleteItem', fileItem, response, status, headers);
      scopeDatabind(response);
    }

    function onProgressItem(fileItem, progress) {
      //$scope.progress = progress;
      //console.log('onProgressItem', fileItem, progress);
    }

    function onErrorItem(fileItem, response, status, headers) {
      ErrorNotification('Error',
        'No fue posible cargar el archivo, intentelo mas tarde o contacte a su administrador.');


    }

    $http.get('api/portfolioss/' + $routeParams.id).then(function (data) {
      scopeDatabind(data.data);
    });

    function scopeDatabind(data) {
      $scope.portfolio = data;
      var arr = [];
      data.concepts.forEach(function (item) {
        item.upload = new FileUploader({
          url: '/api/tryouts',
          alias: 'attachment',
          domElement: item._id,
          withCredentials: true,
          headers: {'Authorization': 'Bearer ' + $cookieStore.get('token')},
          formData: [
            {document: $routeParams.id},
            {concept: item._id}
          ]
        });

        item.upload.onAfterAddingFile = onAfterAddingFile;
        item.upload.onSuccessItem = onSuccessItem;
        item.upload.onProgressItem = onProgressItem;
        item.upload.onCompleteItem = onCompleteItem;
        item.upload.onErrorItem = onErrorItem;
      });
    }

    //listen for ng-repeat finish
    $scope.$on('onFinishedRender', function () {
      angular.element('[type=file]').toggleClass('hide');
      angular.element('.fakeBtn').toggleClass('hide');
    });

    function inputEnableDisable(input, enable) {
      if(enable === false) {
        input.addClass('pulse2');
        input.attr('disabled', 'disabled');
      } else {
        input.removeAttr('disabled');
        input.removeClass('pulse2');
      }
    }

    $scope.updateConcept = function(input, attrs) {
      inputEnableDisable(input, false);
      var model = {};
      model[attrs.field] = input.val();
      $http.put('api/portfolioss/' + attrs.portfolioId + '/concept/' + attrs.conceptId,
        model).then(function() {
          inputEnableDisable(input, true);
        }, function(err) {
          inputEnableDisable(input, true);
          ErrorNotification('Error',
            '<p>No fue posible guardar los cambios, intentelo mas tarde o contacte a su administrador.</p>');
        });
    };

    $scope.updateFileName = function (input, attrs) {
      inputEnableDisable(input, false);
      $http.post('api/tryouts/' + attrs.portfolioId + '/' + attrs.conceptId + '/' + attrs.attachmentId,
        {name: input.val()}).then(function () {
          inputEnableDisable(input, true);
        }, function (err) {
          inputEnableDisable(input, true);
          ErrorNotification('Error',
            '<p>No fue posible guardar los cambios, intentelo mas tarde o contacte a su administrador.</p>');


        });
    };

    $scope.deleteFile = function (url, portfolio_id, concept_id, attachment_id, event, name) {

      Modal.confirm.delete(function() {
        angular.element(event.target).attr('disabled');
        $http.post('api/tryouts/remove/attachment', {
          url: url,
          portfolio_id: portfolio_id,
          concept_id: concept_id,
          attachment_id: attachment_id
        }).then(function (response) {
          scopeDatabind(response.data);
        }, function () {
          angular.element(event.target).removeAttr('disabled');
        });
      })(undefined, '<p>¿Está seguro que desea eliminar el archivo <strong>' + name + '</strong>? </p>');
    };

    $scope.copyLink = function (s3url, url) {
      angular.element('#clipboard').val(s3url + url);
      angular.element('#clipboard').select();
      $window.document.execCommand('copy');
    };
  });

