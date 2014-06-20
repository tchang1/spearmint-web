angular.module('spearmintWebApp')
    .service('sharedProperties', function () {
        var properties={};

        return {
            get: function (key) {
                return properties[key];
            },
            set: function(key, value) {
                properties[key] = value;
            }
        };
    });