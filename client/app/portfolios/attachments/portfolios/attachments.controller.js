'use strict';

angular.module('newappApp')
  .controller('PortfoliosAttachmentsCtrl', function ($scope, $http, $routeParams, FileUploader) {

    //currently using tryout endpoint need to remove



    function onAfterAddingFile (fileItem) {
      angular.element('.' + fileItem.uploader.domElement).toggleClass('hide');
      fileItem.upload();
    }

    function onSuccessItem  (fileItem, response, status, headers) {
      angular.element('.' + fileItem.uploader.domElement).toggleClass('hide');
    }

    function onCompleteItem (fileItem, response, status, headers) {
      //console.log('onCompleteItem', fileItem, response, status, headers);
    }

    function onProgressItem (fileItem, progress) {
      //$scope.progress = progress;
      //console.log('onProgressItem', fileItem, progress);
    }

    $http.get('api/portfolioss/' + $routeParams.id).then(function(data) {
      $scope.portfolio = data.data;
      var arr = [];
      data.data.concepts.forEach(function(item) {
         item.upload = new FileUploader({
           url: '/api/tryouts',
           alias: 'attachment',
           domElement:item._id,
           formData:[
             { document: $routeParams.id },
             { concept: item._id }
           ]
         });

        item.upload.onAfterAddingFile = onAfterAddingFile;
        item.upload.onSuccessItem = onSuccessItem;
        item.upload.onProgressItem = onProgressItem;
        item.upload.onCompleteItem = onCompleteItem;

      });



    });

    //posible way to listen for ng-repeat finish
    //http://stackoverflow.com/questions/15207788/calling-a-function-when-ng-repeat-has-finished
    $scope.$on('onFinishedRender', function() {
      angular.element('[type=file]').toggleClass('hide');
      angular.element('.fakeBtn').toggleClass('hide');
    });

  });
