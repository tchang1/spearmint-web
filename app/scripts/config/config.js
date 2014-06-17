'use strict';

angular.module('spearmintWebApp')
    .factory('config', function () {
        return {
            consoleLoggingEnabled: true,
            consoleErrorLoggingEnabled: true,
            analyticsEnabled: true,

            cookieSessionKey: 'momentSessionId',

            server: {
                baseURL: '',
                userServiceURL: '/users',
                myGoalURL: '/goals/me',
                goalURL: '/goals',
                loginURL: '/login'
            }
        }
    });