'use strict';

angular.module('spearmintWebApp').factory('cookieManager', ['$cookieStore', 'logger',
    function($cookieStore, logger) {
        return {
            put: function(key, value) {
                if (!key || !value) {
                    logger.error('Invalid key-value pair for setting cookie!');
                }
                else {
                    logger.log('cookie manager storing value: ' + value + ' for key: ' + key);
                    $cookieStore.put(key, value);
                }
            },

            get: function(key) {
                var value;

                if (!key) {
                    logger.error('Invalid key for getting cookie value!');
                }
                else {
                    value = $cookieStore.get(key);
                }
                return value;
            },

            clear: function(key) {
                if (!key) {
                    logger.error('Invalid key for clearing cookie value!');
                }
                else {
                    $cookieStore.remove(key);
                }
            }
        }
    }]);