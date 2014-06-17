'use strict';

angular.module('spearmintWebApp')
    .factory('goal', ['logger', function (logger) {
        var userGoal;
        return {
            create: function(goal) {
                goal = (goal) ? goal : {};
                goal.name = (goal.name) ? goal.name : '';
                goal.amountSaved = (goal.amountSaved) ? goal.amountSaved : 0;
                goal.targetAmount = (goal.targetAmount) ? goal.targetAmount : 0;

                logger.log('Creating goal with name: ' + name + ' amountSaved:' + amountSaved + ' and goalAmount:' + goalAmount);
                userGoal = goal;
                return userGoal;
            },

            getStoredGoal: function() {
                return userGoal;
            }
        }
    }]);