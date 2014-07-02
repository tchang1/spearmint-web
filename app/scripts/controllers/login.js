'use strict';

angular.module('spearmintWebApp')
  .controller('LoginCtrl', ['$scope', '$location', '$analytics', 'logger', 'goal', 'userService', 'goalService', 'prettyPrettyBackground',
    function ($scope, $location, $analytics, logger, goal, userService, goalService, prettyPrettyBackground) {
      $scope.error = '';

        prettyPrettyBackground.initWithCanvas(document.getElementById('imageCanvas'));
        if (!prettyPrettyBackground.hasImage()) {
            prettyPrettyBackground.setImage('/images/FTU/Path.jpg', true, new canvasEngine.Color(0,0,0,0.3));
            prettyPrettyBackground.start();
        }

      document.ontouchmove = function(event){
        event.preventDefault();
      };

      $scope.loginUser = function(form) { 
        $scope.submitted = true; 

        if(form.$valid) {
          logger.log('Form validated');
        $analytics.eventTrack('actionTap', {  category: 'login' , label: 'loginSubmit'});
          }
          userService.login($scope.user.email, $scope.user.password).then(
            function(result) {
              logger.log('Result: ' + result);
              $analytics.eventTrack('response', {  category: 'login' , label: 'loginSuccess'});
              $location.path('/home');
              },

            function(error) {
              $analytics.eventTrack('response', {  category: 'login' , label: 'loginFail:'+error});
              logger.error(error);
              if (error.errorCode == 404 || error.errorCode == 0) {
                  $scope.error = 'Could not log in due to network issues';
              }
              else {
                  $scope.error = 'Invalid username or password';
              }

            }
          );

      };



  }]); 