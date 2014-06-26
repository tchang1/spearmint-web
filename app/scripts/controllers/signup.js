'use strict';

angular.module('spearmintWebApp')
  .controller('SignupCtrl', ['$scope', '$location','$analytics', 'logger', 'goal', 'userService', 'goalService', 
    function ($scope, $location, $analytics, logger, goal, userService, goalService) {

      document.ontouchmove = function(event){
        event.preventDefault();
      }

      $scope.signupUser = function(form) { 
        $scope.submitted = true;

        if(form.$valid) {
          logger.log('Form validated');
          $analytics.eventTrack('actionTap', {  category: 'signup' , label: 'signupSubmit'});

          userService.createUser($scope.user.email, $scope.user.password).then(
          function(result) {
            logger.log('User created successfully');
            var userGoal = goal.getStoredGoal(); 

            goalService.saveGoal(userGoal).then(
                     // success handler
              function(result) {
                logger.log('Goal created successfully');
                goal.save(result[0]);
                $analytics.eventTrack('response', {  category: 'signup' , label: 'goalCreateSuccess'});
                logger.log(result[0]);
              },

                     // error handler
              function(error) {

                logger.log('Failed to create goal');
                $analytics.eventTrack('response', {  category: 'signup' , label: 'signupGoalCreateFail:'+error});
                logger.error(error);
              }
            )

            userService.login($scope.user.email, $scope.user.password).then(
            function(result) {
              logger.log('Result: ' + result);
              $analytics.eventTrack('response', {  category: 'signup' , label: 'signupLoginSuccess'});

              $location.path('/home');
              },

            function(error) {
              $analytics.eventTrack('response', {  category: 'signup' , label: 'signuploginFail:'+error});
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

