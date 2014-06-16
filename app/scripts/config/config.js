'use strict';

angular.module('spearmintWebApp')
    .factory('config', function () {
        return {
            consoleLoggingEnabled: true,
            consoleErrorLoggingEnabled: true,
            analyticsEnabled: true,

            cookieSessionKey: 'momentSessionId',

            server: {
                baseURL: 'localhost',
                userServiceURL: '/login',
                goalServiceURL: '/goals'
            }
        }
    });