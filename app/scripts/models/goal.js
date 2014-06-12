'use strict';

angular.module('spearmintWebApp')
    .factory('goal', ['logger', function (logger) {
        return {
            create: function(name, amountSaved, goalAmount) {
                name = (name) ? name : '';
                amountSaved = (amountSaved) ? amountSaved : 0;
                goalAmount = (goalAmount) ? goalAmount : 0;

                logger.log('Creating goal with name: ' + name + ' amountSaved:' + amountSaved + ' and goalAmount:' + goalAmount);
                return {
                    name: name,
                    amountSaved: amountSaved,
                    goalAmount: goalAmount
                }
            }
        }
    }]);