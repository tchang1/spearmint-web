'use strict';

angular.module('spearmintWebApp')
  .controller('GoalCtrl', ['$scope', '$location', 'goal', 'logger', function ($scope, $location, goal, logger) {

  	// var userGoal = element(by.binding("userGoal"));
  	// var goalAmount = element(by.binding("goalAmount"));
    $scope.goalAmount = '';

    $scope.suggestedGoals = [
        'Move to a new place',
        'Get a car',
        'Go on vacation',
        'Get married',
        'Go back to school',
        'Pay off debt'
    ];

  	$scope.enterGoal = function() { 
  		var goalObject = {name: $scope.userGoal};
  		goal.save(goalObject);
  		$location.path('/setamount');
        setTimeout(function() {
            angular.element('#goalAmountInput').focus();
        }, 100)
  	};

  	$scope.enterAmount = function() { 
   		goal.getStoredGoal().targetAmount = $scope.goalAmount; 
  		$location.path('/signup');
  	};

    $scope.selectSuggestedGoal = function($event, goalName) {
        $event.preventDefault();
        $scope.userGoal = goalName;
    };

   $scope.goalLinkClicked = function($event) {
        $event.preventDefault();
       $scope.enterGoal();
   };

    $scope.amountLinkClicked = function($event) {
        $event.preventDefault();
        $scope.enterAmount();
    };

    angular.element('#goalNameInput').focus();

  }]); 