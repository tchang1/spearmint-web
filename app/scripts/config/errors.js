'use strict';

angular.module('spearmintWebApp')
    .factory('errors', function () {
        return {
            errorCode: {
                unknown: -1,
                sessionCookieNotFound: 2001,
                invalidRESTRequest: 3001
            },

            createError: function(errorCode) {
                return {errorCode: errorCode};
            },

            errorMessageForCode: function(errorCode) {
                var errorMessage;
                switch(errorCode) {
                    case 2001:
                        errorMessage = 'The session cookie was not found';
                        break;
                    default:
                        errorMessage = 'An unknown error has occurred';
                        break;
                }
                return errorMessage;
            }
        }
    });