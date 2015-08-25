'use strict';
/**
  https://github.com/nervgh/angular-file-upload/blob/master/examples/without-bootstrap/index.html
*/

angular.module('newappApp')
  .controller('TryoutCtrl', function ($scope, FileUploader) {
    $scope.message = 'Hello';
    $scope.data = ['One', 'Two', 'Three'];
    var uploader = $scope.uploader = new FileUploader({
            url: '/api/tryouts',
            alias: 'attachment',
            formData:[{ none:'one' }]
        });

        $scope.progress = 0;

        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            $scope.progress = 0;
            fileItem.upload();

        };

        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };

        uploader.onProgressItem = function(fileItem, progress) {
          $scope.progress = progress;
           //console.info('onProgressItem', fileItem, progress);
       };
  });
