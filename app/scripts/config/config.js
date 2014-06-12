'use strict';

angular.module('spearmintWebApp')
    .factory('config', function () {
        return {
            consoleLoggingEnabled: true,
            consoleErrorLoggingEnabled: true,

            cookieSessionKey: 'momentSessionId',

            server: {
                baseURL: 'baseURL',
                userServiceURL: 'userServiceURL',
                goalServiceURL: 'goalServiceURL'
            }
        }
    });