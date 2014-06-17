'use strict';

angular.module('spearmintWebApp')
  .controller('FTUCtrl', ['$scope', '$location', 'logger', function ($scope, $location, logger) {

    var ftuMessages = [
      { title: 'Don\'t spend as much!',
        description: 'Stop spending and start saving towards what you really want', 
        image: 'images/HandIcon.png' 
      },
      { title: 'Get started with your goals',
        description: 'What are your real goals in life? Save up for those! ', 
        image: 'images/TargetIcon.png' 
      }
    ];

    $scope.valueProps = ftuMessages; 
    $scope.pageNum = 'one';
    $scope.currentProp = ftuMessages[0];

     $scope.next = function() {
       $scope.pageNum = 'two'; 
       $scope.currentProp = ftuMessages[1];

       /* move the divs around and update the pages indicator */ 
       /* if we are on the last valueprop then show the set a goal, otherwise show skip, both go to set a goal page */ 
     };

     $scope.back = function() {
       $scope.pageNum = 'one'; 
       $scope.currentProp = ftuMessages[0];

       /* move the divs around and update the pages indicator */ 
       /* if we are on the last valueprop then show the set a goal, otherwise show skip, both go to set a goal page */ 
     };

    $scope.setGoal = function() {
      $location.path('/setgoal');
    };

  }]);

