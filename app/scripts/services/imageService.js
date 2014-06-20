'use strict';

angular.module('spearmintWebApp').factory('imageService', ['RESTService', '$q', 'logger', 'config',
    function(RESTService, $q, logger, config) {
        return {
            getNextImages: function(goal) {
                var goalid=goal._id;
                var categoryid=goal.categoryid;
                var deferred = $q.defer();
                logger.log(goal);
                if (!goal) {
                    deferred.reject('input goal is empty');
                    return deferred.promise;
                }
                logger.log('Getting next image for user.');
                RESTService.get({url: config.server.baseURL + config.server.myImageURL+'?goalid='+goalid+'&categoryid='+categoryid}).then(
                    // success handler
                    function(data) {
                        logger.log('Images retrieved successfully.');
                        console.log(data);
                        deferred.resolve(data);
                    },
                    //error handler
                    function(error) {
                        logger.log('An error occurred while retrieving images.');
                        logger.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        }
    }]);