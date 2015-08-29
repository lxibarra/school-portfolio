'use strict';

angular.module('newappApp')
  .controller('PortfoliosAttachmentsCtrl', function ($scope, $http, $routeParams, FileUploader, s3Bucket) {

    //currently using tryout endpoint need to remove
    $scope.s3Bucket = s3Bucket;


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
          formData: [
            {document: $routeParams.id},
            {concept: item._id}
          ]
        });

        item.upload.onAfterAddingFile = onAfterAddingFile;
        item.upload.onSuccessItem = onSuccessItem;
        item.upload.onProgressItem = onProgressItem;
        item.upload.onCompleteItem = onCompleteItem;
      });
    }

    //listen for ng-repeat finish
    $scope.$on('onFinishedRender', function () {
      angular.element('[type=file]').toggleClass('hide');
      angular.element('.fakeBtn').toggleClass('hide');
    });

    $scope.updateFileName = function(input, attrs) {
      console.log(input.val(), attrs);

      $http.post('api/tryouts/' + attrs.portfolioId + '/' + attrs.conceptId + '/' + attrs.attachmentId,
        { name:input.val()}).then(function(data){
          //provide some visual update
        }, function() {
          alert('Error');
        });
    }

  });
