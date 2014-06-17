'use strict';

angular.module('spearmintWebApp')
  .controller('GoalCtrl', ['$scope', '$location', 'goal', 'logger', function ($scope, $location, goal, logger) {

  	// var userGoal = element(by.binding("userGoal"));
  	// var goalAmount = element(by.binding("goalAmount")); 

  	$scope.enterGoal = function() { 
  		var goalObject = {name: $scope.userGoal};
  		goal.save(goalObject);
  		$location.path('/setamount');
  	};

  	$scope.enterAmount = function() { 
   		goal.getStoredGoal().targetAmount = $scope.goalAmount; 
  		$location.path('/signup');
  	};

  }]); 