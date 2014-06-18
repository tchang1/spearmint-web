'use strict';

angular.module('spearmintWebApp')
  .controller('LoginCtrl', ['$scope', '$location', 'logger', 'goal', 'userService', 'goalService', 
    function ($scope, $location, logger, goal, userService, goalService) {

      $scope.loginUser = function(form) { 
        $scope.submitted = true; 

        if(form.$valid) {
          logger.log('Form validated');
          userService.login($scope.user.email, $scope.user.password).then(
            function(result) {
              logger.log('Result: ' + result);
              },

            function(error) {
              logger.error(error);
            }
          );
        }

        $location.path('/home');
      };



  }]); 