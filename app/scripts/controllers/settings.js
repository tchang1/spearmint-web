'use strict';

angular.module('spearmintWebApp')
  .controller('SettingsCtrl', ['$scope', '$location', 'goal', 'logger', function ($scope, $location, goal, logger) {


        var imageToDisplay = 'images/travel/image1.jpg';
        document.getElementById("backgroundImage").style.background = "url(" + imageToDisplay +") no-repeat center center fixed";
        document.getElementById("backgroundImage").style.backgroundSize = "100% 100%";

        $scope.settingsLinks = [
            {
                name: 'My Goal',
                id: 'myGoal',
                url: '#'
            }, {
                name: 'Deposit Account',
                id: 'depositAccount',
                url: '#'
            }, {
                name: 'Funding Account',
                id: 'fundingAccount',
                url: '#'
            }, {
                name: 'Notification Settings',
                id: 'notificationSettings',
                url: '#'
            }, {
                name: 'Submit Feedback',
                id: 'submitFeedback',
                url: '#'
            }, {
                name: 'Transaction History',
                id: 'transactionHistory',
                url: '#'
            }
        ];

        $scope.settingsPanel = true;

  }]); 