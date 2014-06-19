'use strict';

angular.module('spearmintWebApp').factory('savingsService', ['RESTService', '$q', 'logger', 'config',
    function(RESTService, $q, logger, config) {
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

                if (!savings) {
                    deferred.reject('Cannot save a null savings');
                    return deferred.promise;
                }

                savings.goalid = (savings.goalid) ? savings.goalid : '';
                savings.savingsAmount = (savings.savingsAmount) ? savings.savingsAmount : 0;

                logger.log('Posting savings');


                RESTService.post({url: config.server.baseURL + config.server.savingsURL,
                        data: savings}).then(
                        // success handler
                        function(data) {
                            logger.log('Savings created successfully.');
                            deferred.resolve(data);
                        },
                        function(error) {
                            logger.log('An error occurred while creating savings');
                            logger.log(error);
                            deferred.reject(error);
                        });

                return deferred.promise;
            }
        }
    }]);