'use strict';

angular.module('spearmintWebApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, userService) {
    $scope.user = {};
    $scope.errors = {};
    userService.isLoggedIn().then(
        function(success) {

        },
        function (error) {
            console.log(error);
        }
    );
    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });