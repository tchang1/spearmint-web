'use strict';

angular.module('spearmintWebApp').factory('userService', ['RESTService', '$q', 'cookieManager', 'logger', 'config', 'errors',
    function(RESTService, $q, cookieManager, logger, config, errors) {

        var userSessionID;

        return {
            createUser: function(email, password) {
                var deferred = $q.defer();
                RESTService.post({url: config.server.baseURL + config.server.userServiceURL,
                                 body: {email: email, password: password}}).then(
                    // success handler
                    function(data) {
                        deferred.resolve(data);
                    },

                    // error handler
                    function(error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            logIn: function(email, password) {
                var deferred = $q.defer();
                RESTService.post({url: config.server.baseURL + config.server.userServiceURL,
                                  body: {email: email, password: password}}).then(
                    // success handler
                    function(data) {
                        deferred.resolve(data);
                    },

                    // error handler
                    function(error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            isLoggedIn: function() {
                var deferred = $q.defer();
                var sessionID = cookieManager.get(config.cookieSessionKey);
                if (!sessionID) {
                    deferred.reject({errorCode: errors.errorCode.sessionCookieNotFound});
                    return deferred.promise;
                }
                RESTService.get({url: config.server.baseURL + config.server.userServiceURL,
                                 body: {email: email, password: password}}).then(
                    // success handler
                    function() {
                        deferred.resolve(true);
                    },

                    // error handler
                    function(error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            getUserSessionID: function() {
                var sessionID;
                if (userSessionID) {
                    sessionID = userSessionID;
                }
                else {
                    sessionID = cookieManager.get(config.cookieSessionKey);
                }
                return sessionID;
            }
        }
    }]);