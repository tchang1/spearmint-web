var app = angular.module('spearmintWebApp');

var GOAL_NAME_REGEX = /^[a-zA-Z0-9 _'"]*$/;
app.directive('goal', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (GOAL_NAME_REGEX.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('goal', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('goal', false);
                    return undefined;
                }
            });
        }
    };
});

//var DOLLAR_AMOUNT = /^\$?[0-9]+(\.[0-9][0-9])?$/;
var DOLLAR_AMOUNT = /^(?!\(.*[^)]$|[^(].*\)$)\(?\$?(0|[1-9]\d{0,2}(,?\d{3})?)(\.\d\d?)?\)?$/;
app.directive('currency', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (DOLLAR_AMOUNT.test(viewValue)) {
                    ctrl.$setValidity('currency', true);
                    if (viewValue.charAt(0) == '$') {
                        viewValue = viewValue.substring(1);
                    }
                    return viewValue;
                } else {
                    if (viewValue == '') {
                        ctrl.$setValidity('currency', true);
                        return viewValue;
                    }
                    else {
                        ctrl.$setValidity('currency', false);
                        return undefined;
                    }
                }
            });
        }
    };
});