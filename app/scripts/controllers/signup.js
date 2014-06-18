'use strict';

angular.module('spearmintWebApp')
  .controller('SignupCtrl', ['$scope', '$location', 'logger', 'goal', 'userService', 'goalService', 
    function ($scope, $location, logger, goal, userService, goalService) {

      $scope.signupUser = function(form) { 
        $scope.submitted = true; 

        if(form.$valid) {
          logger.log('Form validated');
          userService.createUser($scope.user.email, $scope.user.password).then(
          function(result) {
            logger.log('User created successfully');
            var userGoal = goal.getStoredGoal(); 

            goalService.saveGoal(userGoal).then(
                     // success handler
              function(result) {
                logger.log('Goal created successfully');
                goal.save(result[0]);
                logger.log(result[0]);
              },

                     // error handler
              function(error) {
                logger.log('Failed to create goal');
                logger.error(error);
              }
            )

            userService.login($scope.user.email, $scope.user.password).then(
            function(result) {
              logger.log('Result: ' + result);
              $location.path('/home');
              },

            function(error) {
              logger.error(error);
            }
          );

          },

          function(error) {
            logger.log('Failed to create user');
            logger.error(error);
          }
          );
        }
      };



  }]); 

