'use strict';

angular.module('spearmintWebApp')
  .controller('WelcomeCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {

    $scope.getStarted = function() {
      Auth.logout()
      .then(function() {
        $location.path('/ftu');
      });
    };

    $scope.login = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };

  }]); 