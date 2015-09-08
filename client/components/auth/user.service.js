'use strict';

angular.module('newappApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      updatePassword:{
        method: 'PUT',
        params: {
          controller:'updatePassword'
        }
      },
      activate: {
        method:'PUT',
        params: {
          controller:'activate'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
