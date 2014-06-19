'use strict';

angular.module('spearmintWebApp')
  .controller('LoginCtrl', ['$scope', '$location', 'logger', 'goal', 'userService', 'goalService', 
    function ($scope, $location, logger, goal, userService, goalService) {

      document.ontouchmove = function(event){
        event.preventDefault();
      }

      $scope.loginUser = function(form) { 
        $scope.submitted = true; 

        if(form.$valid) {
          logger.log('Form validated');
          userService.login($scope.user.email, $scope.user.password).then(
            function(result) {
              logger.log('Result: ' + result);
              $location.path('/home');
              },

            function(error) {
              logger.error(error);
            }
          );
        }

      };



  }]); 