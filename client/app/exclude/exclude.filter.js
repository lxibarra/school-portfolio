'use strict';

angular.module('newappApp')
  .filter('exclude', function () {
    return function (data, field, value) {
      if(angular.isObject(data) && angular.isString(field) && angular.isString(value)) {
        var collection = [];

        data.data.forEach(function (item) {
          if(item[field] !== value) {
            collection.push(item);
          }
        });
        return collection;
      }
      else {
        return data;
      }
    };
  });
