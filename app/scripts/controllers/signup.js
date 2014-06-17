'use strict';

angular.module('spearmintWebApp')
  .controller('SignupCtrl', ['$scope', '$location', 'logger', function ($scope, $location, logger) {

  	// $scope.initUserGoal = function(goal, amount) { 
   //    if (goal != "") {
   //      $scope.userGoal = goal; 
   //    } else { 
   //      $scope.userGoal = "NO GOAL";
   //    }

   //    if (amount > 0) {
   //      $scope.goalAmount = amount; 
   //    } else { 
   //      $scope.goalAmount = -1; // To Do: perhaps make this some other special value? 
   //    }

      logger.log($scope.userGoal);
      logger.log($scope.goalAmount);



  }]); 

