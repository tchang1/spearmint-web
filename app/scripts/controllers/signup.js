'use strict';

angular.module('spearmintWebApp')
  .controller('SignupCtrl', ['$scope', '$location','$analytics', 'logger', 'goal', 'userService', 'goalService', 'prettyPrettyBackground',
    function ($scope, $location, $analytics, logger, goal, userService, goalService, prettyPrettyBackground) {


    prettyPrettyBackground.initWithCanvas(document.getElementById('imageCanvas'));
    if (!prettyPrettyBackground.hasImage()) {
        prettyPrettyBackground.setImage('/images/FTU/Path.jpg', true, new canvasEngine.Color(0,0,0,0.3));
        prettyPrettyBackground.start();
    }



      document.ontouchmove = function(event){
        event.preventDefault();
      };

      $scope.error = '';

      $scope.signupUser = function(form) { 
        $scope.submitted = true;

        if(form.$valid) {
          logger.log('Form validated');
          $analytics.eventTrack('actionTap', {  category: 'signup' , label: 'signupSubmit'});

          userService.createUser($scope.user.email, $scope.user.password).then(
          function(result) {
            logger.log('User created successfully');
            var userGoal = goal.getStoredGoal();
            userGoal = (userGoal) ? userGoal : {};

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
            );

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
            $scope.error = error.data;
          }
          );
        }
      };



  }]); 

