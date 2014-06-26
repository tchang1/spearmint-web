'use strict';

angular.module('spearmintWebApp').factory('userService', ['RESTService', '$q', 'cookieManager', 'logger', 'config', 'errors',
    function(RESTService, $q, cookieManager, logger, config, errors) {

        var userSessionID;

        return {
            createUser: function(username, password) {
                var deferred = $q.defer();
                RESTService.post({url: config.server.baseURL + config.server.userServiceURL,
                                 data: {username: username, password: password, notifications: 'Y'}}).then(
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

            login: function(username, password) {
                var deferred = $q.defer();
                RESTService.post({url: config.server.baseURL + config.server.loginURL,
                                  data: {username: username, password: password}}).then(
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

            logout: function() {
                var deferred = $q.defer();
                RESTService.get({url: config.server.baseURL + config.server.logoutURL}).then(
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