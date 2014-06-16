'use strict';

angular.module('spearmintWebApp')
  .controller('WelcomeCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.getStarted = function() {
        $location.path('/ftu');
    };

    $scope.login = function() {
        $location.path('/');
    };

  }]); 