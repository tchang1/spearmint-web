'use strict';

angular.module('spearmintWebApp')
  .controller('FTUCtrl', ['$scope', '$location', '$analytics', 'logger', function ($scope, $location, $analytics, logger) {

    // var ftuMessages = [
    //   { title: 'Don\'t spend as much!',
    //     description: 'Stop spending and start saving towards what you really want', 
    //     image: 'images/HandIcon.png' 
    //   },
    //   { title: 'Get started with your goals',
    //     description: 'What are your real goals in life? Save up for those! ', 
    //     image: 'images/TargetIcon.png' 
    //   }
    // ];

    // $scope.valueProps = ftuMessages; 
    // $scope.pageNum = 'one';
    // $scope.currentProp = ftuMessages[0];

    //  $scope.next = function() {
    //    $scope.pageNum = 'two'; 
    //    $scope.currentProp = ftuMessages[1];

    //    /* move the divs around and update the pages indicator */ 
    //    /* if we are on the last valueprop then show the set a goal, otherwise show skip, both go to set a goal page */ 
    //  };

    //  $scope.back = function() {
    //    $scope.pageNum = 'one'; 
    //    $scope.currentProp = ftuMessages[0];

    //    /* move the divs around and update the pages indicator */ 
    //    /* if we are on the last valueprop then show the set a goal, otherwise show skip, both go to set a goal page */ 
    //  };

    $scope.message1 = "Let go ont he amount you want to contribute. We will keep track of your progress.";
    $scope.message2 = "The savings add up quickly!";

    $scope.setGoal = function() {
      $analytics.eventTrack('linkTap', {  category: 'ftu_goal' , label: 'proceed_to_setGoal'});

      $location.path('/setgoal');
    };

  }]);

