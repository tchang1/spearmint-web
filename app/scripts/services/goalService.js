'use strict';

angular.module('spearmintWebApp').factory('goalService', ['$http', '$q', 'logger',
    function($http, $q, logger) {
        return {
            getGoal: function() {
                var deferred = $q.defer();
                $http({ method: 'GET',
                        url: config.server.baseURL + config.server.goalServiceURL,
                        body: {email: email, password: password}}).
                    success(function(data, status, headers, config) {
                        deferred.resolve();
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject();
                    });
                return deferred.promise;
            },

            saveGoal: function(goal) {
                var deferred = $q.defer();
                $http({ method: 'POST',
                    url: config.server.baseURL + config.server.userServiceURL,
                    body: {email: email, password: password}}).
                    success(function(data, status, headers, config) {
                        deferred.resolve();
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        }
    }]);