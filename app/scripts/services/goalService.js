'use strict';

angular.module('spearmintWebApp').factory('goalService', ['RESTService', 'userService', '$q', 'logger', 'config',
    function(RESTService, userService, $q, logger, config) {
        return {
            getGoal: function() {
                var deferred = $q.defer();
                logger.log('Getting goal for user.');
                RESTService.get({url: config.server.baseURL + config.server.myGoalURL}).then(
                    // success handler
                    function(data) {
                        logger.log('Goal retrieved successfully.');
                        deferred.resolve(data);
                    },
                    //error handler
                    function(error) {
                        logger.log('An error occurred while retrieving goal.');
                        logger.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            },


            saveGoal: function(goal) {
                var deferred = $q.defer();

                if (!goal) {
                    deferred.reject('Cannot save a null goal');
                    return deferred.promise;
                }

                goal.name = (goal.name) ? goal.name : 'Enter a goal';
                goal.amountSaved = (goal.amountSaved) ? goal.amountSaved : 0;
                goal.targetAmount = (goal.targetAmount) ? goal.targetAmount : 0;
                if (typeof goal.targetAmount == 'string') {
                    goal.targetAmount.replace(/\s+/g, '');
                }
                goal.isDefined = ('' == goal.name) ? 0 : 1;

                if (goal._id) {
                    RESTService.put({url: config.server.baseURL + config.server.myGoalURL,
                        data: goal}).then(
                        // success handler
                        function(data) {
                            logger.log('Goal updated successfully.');
                            deferred.resolve(data);
                        },
                        function(error) {
                            logger.log('An error occurred while updating goal');
                            logger.log(error);
                            deferred.reject(error);
                        });
                }
                else {
                    RESTService.post({url: config.server.baseURL + config.server.goalURL,
                        data: goal}).then(
                        // success handler
                        function(data) {
                            logger.log('Goal created successfully.');
                            deferred.resolve(data);
                        },
                        function(error) {
                            logger.log('An error occurred while creating goal');
                            logger.log(error);
                            deferred.reject(error);
                        });
                }
                return deferred.promise;
            }
        }
    }]);