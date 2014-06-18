'use strict';

angular.module('spearmintWebApp').factory('savingsService', ['RESTService', '$q', 'logger', 'config',
    function(RESTService, userService, $q, logger, config) {
        return {
            getSavings: function() {
                var deferred = $q.defer();
                logger.log('Getting savings for user.');
                RESTService.get({url: config.server.baseURL + config.server.mySavingsURL}).then(
                    // success handler
                    function(data) {
                        logger.log('Savings retrieved successfully.');
                        deferred.resolve(data);
                    },
                    //error handler
                    function(error) {
                        logger.log('An error occurred while retrieving savings.');
                        logger.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            },


            createNewSavings: function(savings) {
                var deferred = $q.defer();

                if (!goal) {
                    deferred.reject('Cannot save a null savings');
                    return deferred.promise;
                }

                savings.goalid = (savings.goalid) ? savings.goalid : '';
                savings.savingsAmount = (goal.amountSaved) ? savings.savingsAmount : 0;



                    RESTService.post({url: config.server.baseURL + config.server.savingsURL,
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

                return deferred.promise;
            }
        }
    }]);