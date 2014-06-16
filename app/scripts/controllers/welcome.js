'use strict';

angular.module('spearmintWebApp')
  .controller('WelcomeCtrl', ['$scope', '$location', 'goalService', 'userService', 'logger',
        function ($scope, $location, goalService, userService, logger) {

    $scope.getStarted = function() {
        $location.path('/ftu');
    };

    $scope.login = function() {
        $location.path('/');
    };

    // example of how to log in and retrieve the user's goal

//    userService.login('test', 'test123').then(
//        function(result) {
//            logger.log('Result: ' + result);
//            goalService.getGoal().then(
//                // success handler
//                function(result) {
//                    logger.log(result);
//                },
//
//                // error handler
//                function(error) {
//                    logger.error(error);
//                }
//            )
//        },
//
//        function(error) {
//            logger.error(error);
//        }
//    );

  }]); 