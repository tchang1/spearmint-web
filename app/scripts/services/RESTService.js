'use strict';

angular.module('spearmintWebApp').factory('RESTService', ['$http', '$q', 'cookieManager', 'logger', 'errors',
    function($http, $q, cookieManager, logger, errors) {

        var addDefaultHeaders = function(headers) {
            headers = (headers) ? headers : {};

            return headers;
        };

        return {
            get: function(requestObject) {
                var me = this;
                var deferred = $q.defer();

                requestObject = (requestObject) ? requestObject : {};
                requestObject.method = 'GET';

                me.request(requestObject).then(
                    // success handler
                    function(data) {
                        deferred.resolve(data);
                    },

                    // error handler
                    function(error) {
                        deferred.reject(error);
                    }
                );
                return deferred.promise;
            },

            post: function(requestObject) {
                var me = this;
                var deferred = $q.defer();

                requestObject = (requestObject) ? requestObject : {};
                requestObject.method = 'POST';

                me.request(requestObject).then(
                    // success handler
                    function(data) {
                        deferred.resolve(data);
                    },

                    // error handler
                    function(error) {
                        deferred.reject(error);
                    }
                );
                return deferred.promise;
            },

            put: function(requestObject) {
                var me = this;
                var deferred = $q.defer();

                requestObject = (requestObject) ? requestObject : {};
                requestObject.method = 'PUT';

                me.request(requestObject).then(
                    // success handler
                    function(data) {
                        deferred.resolve(data);
                    },

                    // error handler
                    function(error) {
                        deferred.reject(error);
                    }
                );
                return deferred.promise;
            },

            delete: function(requestObject) {
                var me = this;
                var deferred = $q.defer();

                requestObject = (requestObject) ? requestObject : {};
                requestObject.method = 'DELETE';

                me.request(requestObject).then(
                    // success handler
                    function(data) {
                        deferred.resolve(data);
                    },

                    // error handler
                    function(error) {
                        deferred.reject(error);
                    }
                );
                return deferred.promise;
            },

            request: function(requestObject) {
                var deferred = $q.defer();
                requestObject = (requestObject) ? requestObject : {};
                if (!requestObject.method) {
                    logger.error('REST request does not have a method!');
                    deferred.reject(errors.createError(errors.errorCode.invalidRESTRequest));
                    return deferred.promise;
                }

                if (!requestObject.url) {
                    logger.error('REST request does not have a url!');
                    deferred.reject(errors.createError(errors.errorCode.invalidRESTRequest));
                    return deferred.promise;
                }

                requestObject.params = (requestObject.params) ? requestObject.params : {};
                requestObject.data = (requestObject.data) ? requestObject.data : {};
                requestObject.headers = addDefaultHeaders(requestObject.headers);

                $http({ method: requestObject.method,
                        url: requestObject.url,
                        params: requestObject.params,
                        data: requestObject.data,
                        headers: requestObject.headers}).
                    success(function(data, status, headers, config, statusText) {
                        logger.log('REST call returned ' + status + ' - ' + statusText);
                        deferred.resolve(data);
                    }).
                    error(function(data, status, headers, config, statusText) {
                        logger.log('REST call returned ' + status + ' - ' + statusText);
                        deferred.reject({errorCode: status,
                                        statusText: statusText,
                                        data: data});
                    });
                return deferred.promise;
            }
        }
    }]);