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
                id: 'notification',
                url: '#'
            }, {
                name: 'Submit Feedback',
                id: 'feedback',
                url: '#'
            }, {
                name: 'Transaction History',
                id: 'transaction',
                url: '#'
            }
        ];

        $scope.screens = {
            menu: {
                displayed: true,
                initialState: true
            },
            myGoal: {
                displayed: false,
                initialState: true
            },
            notification: {
                displayed: false,
                initialState: true
            },
            feedback: {
                displayed: false,
                initialState: true
            },
            transaction: {
                displayed: false,
                initialState: true
            }
        };

        $scope.transactions = [
            {
                amount: '$5',
                date: 'today',
                id: '123'
            },
            {
                amount: '$6',
                date: 'today',
                id: '124'
            },
            {
                amount: '$7',
                date: 'today',
                id: '125'
            }
        ];


        $scope.selectLink = function($event, linkID) {
            $event.preventDefault();
            $scope.screens[linkID].displayed = true;
            $scope.screens[linkID].initialState = false;

            $scope.screens.menu.initialState = false;
            $scope.screens.menu.displayed = false;
        };

        $scope.goBackToMainSettingsPage = function($event) {
            $event.preventDefault();
            for (var screen in $scope.screens) {
                if ($scope.screens.hasOwnProperty(screen)) {
                    $scope.screens[screen].displayed = false;
                }
            }
            $scope.screens.menu.displayed = true;
        };

        $scope.undoTransaction = function($event, transactionID) {
            $event.preventDefault();
            var i;
            var indexToRemove = -1;
            for (i = 0; i < $scope.transactions.length; i++) {
                if ($scope.transactions[i].id == transactionID) {
                    indexToRemove = i;
                    break;
                }
            }

            if (-1 != indexToRemove) {
                $scope.transactions.splice(indexToRemove, 1);
            }

        }

  }]); 