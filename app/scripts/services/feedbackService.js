'use strict';

angular.module('spearmintWebApp').factory('feedbackService', ['RESTService', '$q', 'logger', 'config',
    function(RESTService, $q, logger, config) {
        return {
            sendFeedback: function(feedback) {
                var deferred = $q.defer();

                if (!feedback || '' == feedback) {
                    deferred.reject('Cannot save empty feedback');
                    return deferred.promise;
                }


                RESTService.post({url: config.server.baseURL + config.server.feedbackURL,
                    data: {feedback: feedback}}).then(
                    // success handler
                    function(data) {
                        logger.log('Feedback sent successfully');
                        deferred.resolve(data);
                    },
                    function(error) {
                        logger.log('An error occurred while sending feedback');
                        logger.log(error);
                        deferred.reject(error);
                    });

                return deferred.promise;
            }
        }
    }]);