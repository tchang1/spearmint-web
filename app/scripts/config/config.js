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
                mySavingsURL: '/savings/me',
                savingsURL: '/savings',
                goalURL: '/goals',
                loginURL: '/login',
                logoutURL: '/logout',
                myImageURL: '/images/me',
                feedbackURL: '/feedback',
                notifications: '/notifications/me'
            }
        }
    });