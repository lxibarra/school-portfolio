'use strict';

angular.module('newappApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Modal) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = Modal.confirm.delete(function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    });

   $scope.activate = function(user) {
     user.$activate();
     user.status = !user.status;
   };

    $scope.updatePassword = Modal.confirm.updatePassword(function(user, newPassword) {
      var tmpuser = angular.copy(user);
      tmpuser.newPassword = newPassword.pass;
      //falta poner aqui el then and error
      tmpuser.$updatePassword().catch(function(){
        Modal.confirm.errorNotification(angular.noop)
        ('Error general', 'Se produjo un error al intentar cambiar la contraseña de ' + tmpuser.name);
      });
    });

  });
