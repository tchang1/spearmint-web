'use strict';

angular.module('spearmintWebApp').factory('cloner', [function() {
        return {
            clone: function(obj) {
                if (!obj) {
                    return null;
                }
                var clone = {};

                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        clone[property] = obj[property];
                    }
                }

                return clone;
            }
        }
    }]);