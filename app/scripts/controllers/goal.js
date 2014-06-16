'use strict';

angular.module('spearmintWebApp')
  .controller('GoalCtrl', ['$scope', '$location', function ($scope, $location) {

  	$scope.userGoal = {}; 

  	$scope.goalAmount = {}; 

  	$scope.enterGoal = function() { 
  		$location.path('/setamount');
  	};

  	$scope.enterAmount = function() { 
  		$location.path('/home');
  	};

  }]); 