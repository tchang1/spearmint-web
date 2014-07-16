'use strict';

angular.module('spearmintWebApp').factory('emailer', ['$window', 'logger', function($window, logger) {
    var defaultTo = 'matthew_ziegler@intuit.com';
    var defaultCC = 'cash@square.com';
    var defaultSubject = '';
    var defaultBody = 'Please leave the body of this email blank.';

    return {
        openForm: function(emailOptions) {
            emailOptions = (emailOptions) ? emailOptions : {};
            var to = (emailOptions.to) ? emailOptions.to : defaultTo;
            var cc = (emailOptions.cc) ? emailOptions.cc : defaultCC;
            var subject = (emailOptions.subject) ? emailOptions.subject : defaultSubject;
            var body = (emailOptions.body) ? emailOptions.body : defaultBody;

            var emailURL = 'mailto:' + to + '?' +
                'cc=' + cc + '&' +
                'subject=' + subject + '&' +
                'body=' + body;

            logger.log('sending email: ' + emailURL);

            $window.location.href = emailURL;
        }
    }
}]);