'use strict';

angular.module('spearmintWebApp')
  .controller('GoalCtrl', ['$scope', '$location', '$analytics', 'goal', 'logger', 'prettyPrettyBackground', function ($scope, $location, $analytics, goal, logger, prettyPrettyBackground) {

    prettyPrettyBackground.initWithCanvas(document.getElementById('imageCanvas'));


    $scope.goalAmount = '';
    $scope.userGoal = '';

    $scope.suggestedGoals = [
        'moving',
        'a new car',
        'a vacation',
        'a wedding',
        'going back to school',
        'paying off debt'
    ];

	$scope.enterGoal = function() {
        var goalObject = {name: $scope.userGoal};
            goal.save(goalObject);
            $location.path('/setamount');
	};

	$scope.enterAmount = function() {
        goal.getStoredGoal().targetAmount = $scope.goalAmount;
        if (!$scope.userGoal) {
          $analytics.eventTrack('actionTap', {  category: 'ftu_goal' , label: 'amount_skipped'});
        }
        else {
          $analytics.eventTrack('actionTap', {  category: 'ftu_goal' , label: 'amount_entered'});
        }

		$location.path('/signup');
	};

    $scope.selectSuggestedGoal = function($event, goalName) {
        $event.preventDefault();
        $scope.userGoal = goalName;

        document.getElementById('goalNameInput').value = goalName;
        $analytics.eventTrack('choiceMade', {  category: 'ftu_goal' , label: 'suggested_goal_selected:'+goalName});
    };

   $scope.goalLinkClicked = function($event) {
        $event.preventDefault();
      if (!$scope.userGoal) {
        $analytics.eventTrack('actionTap', {  category: 'ftu_goal' , label: 'goal_skipped'});
      }
      else {
        $analytics.eventTrack('actionTap', {  category: 'ftu_goal' , label: 'goal_saved_is_'+$scope.userGoal});
      }
       $scope.enterGoal();
   };

    $scope.amountLinkClicked = function($event) {
        $event.preventDefault();
        $scope.enterAmount();
    };
  }]); 