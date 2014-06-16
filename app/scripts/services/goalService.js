'use strict';

angular.module('spearmintWebApp').factory('goalService', ['RESTService', 'userService', '$q', 'logger', 'config',
    function(RESTService, userService, $q, logger, config) {
        return {
            getGoal: function() {
                var deferred = $q.defer();
                logger.log('Getting goal for user.');
                RESTService.get({url: config.server.baseURL + config.server.getGoalURL,
                                body: {sessionID: userService.getUserSessionID()}}).then(
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


            saveGoal: function() {
                var deferred = $q.defer();
                logger.log('Saving goal for user.');
                RESTService.post({url: config.server.baseURL + config.server.saveGoalURL,
                    body: {sessionID: userService.getUserSessionID()}}).then(
                    // success handler
                    function(data) {
                        logger.log('Goal saved successfully.');
                        deferred.resolve(data);
                    },
                    function(error) {
                        logger.log('An error occurred while saving goal');
                        logger.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        }
    }]);