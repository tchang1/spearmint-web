'use strict';

angular.module('spearmintWebApp')
  .controller('LoginCtrl', ['$scope', '$location', '$analytics', 'logger', 'goal', 'userService', 'goalService', 
    function ($scope, $location, $analytics, logger, goal, userService, goalService) {
        $scope.error = '';

      document.ontouchmove = function(event){
        event.preventDefault();
      }

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
              if (error.errorCode == 404) {
                  $scope.error = 'Could not log in due to network issues';
              }
              else {
                  $scope.error = 'Invalid username or password';
              }

            }
          );

      };



  }]); 