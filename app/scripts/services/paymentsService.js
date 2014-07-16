'use strict';

angular.module('spearmintWebApp').factory('paymentsService', ['RESTService', '$q', 'logger', 'config',
    function(RESTService, $q, logger, config) {
        return {
            optin: function() {
                var deferred = $q.defer();

                RESTService.post({url: config.server.baseURL + config.server.paymentsOptin}).then(
                    // success handler
                    function(data) {
                        logger.log('User opted in successfully');
                        deferred.resolve(data);
                    },
                    function(error) {
                        logger.log('User could not be opted in');
                        logger.log(error);
                        deferred.reject(error);
                    });

                return deferred.promise;
            }
        }
    }]);