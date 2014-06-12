'use strict';

angular.module('spearmintWebApp').factory('logger', ['config', function(config) {
        return {
            log: function(message) {
                if (config.consoleLoggingEnabled) {
                    console.log(message);
                }
            },

            error: function(message) {
                console.error(message);
            }
        }
    }]);