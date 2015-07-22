'use strict';

angular.module('newappApp')
  .controller('ConceptsCtrl', function ($scope, $http, Auth) {

    //need to create a table with pager, filter and number of results per page
    //posible solution using skip and limit
    //http://docs.mongodb.org/manual/reference/method/db.collection.find/

    //http://meshfields.de/server-side-pagination-angular-mongodb/

    $http.get('api/concepts').success(function(data) {
      $scope.data = data;
    });

    $scope.changeStatus = function(_id) {
      console.log('update the record:', _id);

    }

  });
