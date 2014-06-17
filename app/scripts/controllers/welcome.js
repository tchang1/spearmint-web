'use strict';

angular.module('spearmintWebApp')
  .controller('WelcomeCtrl', ['$scope', '$location', 'goalService', 'userService', 'logger', 'progressIndicator',
        function ($scope, $location, goalService, userService, logger, progressIndicator) {

    $scope.getStarted = function() {
        $location.path('/ftu');
    };

    $scope.login = function() {
        $location.path('/');
    };


//    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));
//
//    progressIndicator.show();
//
//    document.onmousedown=function(){
//        progressIndicator.start();
//    };
//
//    document.onmouseup=function(){
//        progressIndicator.stop();
//        var dollarAmount = progressIndicator.getAmount();
//    };
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