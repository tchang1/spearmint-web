'use strict';

angular.module('spearmintWebApp').factory('analytics', ['config', '$analytics', 'logger', function(config, $analytics, logger) {
    return {
        trackPage: function(pageName) {
            if (!pageName) {
                logger.error('Cannot track empty page name!');
            }
            else if (config.analyticsEnabled) {
                logger.log('Tracking page view: ' + pageName);
                $analytics.pageTrack(pageName);
            }
        },

        trackEvent: function(eventName, parameters) {
            parameters = (parameters) ? parameters : {};

            if (!eventName) {
                logger.error('Cannot track empty event name!');
            }
            else if (config.analyticsEnabled) {
                logger.log('Tracking event: ' + eventName + ' with parameters: ');
                logger.log(parameters);
                $analytics.eventTrack(eventName, parameters);
            }
        }
    }
}]);