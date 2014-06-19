'use strict';

angular.module('spearmintWebApp')
  .controller('SettingsCtrl', ['$scope', '$location', 'goal', 'logger', function ($scope, $location, goal, logger) {


        var imageToDisplay = 'images/travel/image1.jpg';
        document.getElementById("backgroundImage").style.background = "url(" + imageToDisplay +") no-repeat center center fixed";
        document.getElementById("backgroundImage").style.backgroundSize = "100% 100%";

        var modalIdentifiers = {
            undoTransaction: 'undoTransaction',
            depositAccountNotAvailable: 'depositAccountNotAvailable',
            fundingAccountNotAvailable: 'fundingAccountNotAvailable',
            feedbackSubmitted: 'feedbackSubmitted'
        };

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

        $scope.modal = {
            header: 'Header',
            body: 'Some stuff',
            buttonText: 'OK',
            cancelText: 'Cancel',
            name: '',
            data: {},
            visible: false,
            cancelOption: false
        };

        var displayModal = function(header, body, cancelAvailable, identifier, data){
            cancelAvailable = (cancelAvailable == true);
            identifier = (identifier) ? identifier : '';
            data = (data) ? data : {};
            $scope.modal.header = header;
            $scope.modal.body = body;
            $scope.modal.name = identifier;
            $scope.modal.visible = true;
            $scope.modal.cancelOption = cancelAvailable;
            $scope.modal.data = data;
        };


        $scope.selectLink = function($event, linkID) {
            $event.preventDefault();

            if ('depositAccount' == linkID || 'fundingAccount' == linkID) {

                displayModal('Not so fast!',
                            'We\'re sorry, transfering money isn\’t available yet.  We\’re hard at work making it for you!',
                            false,
                            (linkID == 'depositAccount') ? modalIdentifiers.depositAccountNotAvailable : modalIdentifiers.fundingAccountNotAvailable);
            }
            else {
                $scope.screens[linkID].displayed = true;
                $scope.screens[linkID].initialState = false;

                $scope.screens.menu.initialState = false;
                $scope.screens.menu.displayed = false;
            }
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

        $scope.undoTransactionPressed = function($event, transactionID) {
            $event.preventDefault();

            var i;
            var transaction;
            for (i = 0; i < $scope.transactions.length; i++) {
                if ($scope.transactions[i].id == transactionID) {
                    transaction = $scope.transactions[i];
                    break;
                }
            }

            if (transaction) {
                displayModal('Undo this Moment?',
                            transaction.amount + ' on ' + transaction.date,
                            true,
                            modalIdentifiers.undoTransaction,
                            transaction);
            }
        };

        var undoTransaction = function(transactionID) {
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

        };

        $scope.modalOKPressed = function($event, identifier, data){
            $event.preventDefault();
            $scope.modal.visible = false;

            if (identifier == modalIdentifiers.undoTransaction) {
                undoTransaction(data.id);
            }
        };

        $scope.modalCancelPressed = function($event, identifier, data) {
            $event.preventDefault();
            $scope.modal.visible = false;
        };

  }]); 