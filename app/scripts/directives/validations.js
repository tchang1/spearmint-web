var app = angular.module('spearmintWebApp');

var GOAL_NAME_REGEX = /^[a-zA-Z0-9]*$/;
app.directive('goal', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (GOAL_NAME_REGEX.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('goal', true);
                    console.log(viewValue);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('goal', false);
                    console.log(viewValue);
                    return undefined;
                }
            });
        }
    };
});

var DOLLAR_AMOUNT = /^\$?[0-9]+(\.[0-9][0-9])?$/;
app.directive('dollarAmount', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (DOLLAR_AMOUNT.test(viewValue)) {
                    ctrl.$setValidity('dollarAmount', true);
                    if (viewValue.charAt(0) != '$') {
                        viewValue = '$' + viewValue;
                    }
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('dollarAmount', false);
                    return undefined;
                }
            });
        }
    };
});