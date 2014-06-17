'use strict';

angular.module('spearmintWebApp')
    .factory('goal', ['logger', function (logger) {
        var goal;
        return {
            create: function(name, amountSaved, goalAmount) {
                name = (name) ? name : '';
                amountSaved = (amountSaved) ? amountSaved : 0;
                goalAmount = (goalAmount) ? goalAmount : 0;

                logger.log('Creating goal with name: ' + name + ' amountSaved:' + amountSaved + ' and goalAmount:' + goalAmount);
                goal = {
                    name: name,
                    amountSaved: amountSaved,
                    goalAmount: goalAmount
                };
                return goal;
            },

            getStoredGoal: function() {
                return goal;
            }
        }
    }]);