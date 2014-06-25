'use strict';

angular.module('spearmintWebApp')
  .controller('SettingsCtrl', ['$scope', '$location', '$q', 'goal', 'goalService', 'userService', 'savingsService', 'feedbackService', 'imageService', 'logger', 'cloner', 'sharedProperties',
        function ($scope, $location, $q, goal, goalService, userService, savingsService, feedbackService, imageService, logger, cloner, sharedProperties) {

        var path = '../images/';
        var imageToDisplay = sharedProperties.get('currentBackgroundImage');
        if (imageToDisplay) {
            document.getElementById("backgroundImage").style.background = "url(" + imageToDisplay +") no-repeat center center fixed";
            document.getElementById("backgroundImage").style.backgroundSize = "auto 100%";
        }

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

        $scope.emailNotification = true;
        $scope.feedback = '';

//        $scope.transactions = [
//            {
//                amount: '$5',
//                date: 'today',
//                id: '123'
//            },
//            {
//                amount: '$6',
//                date: 'today',
//                id: '124'
//            },
//            {
//                amount: '$7',
//                date: 'today',
//                id: '125'
//            }
//        ];

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
            if ($scope.screens.menu.displayed) {
                $location.path('/home');
            }
            else {
                for (var screen in $scope.screens) {
                    if ($scope.screens.hasOwnProperty(screen)) {
                        $scope.screens[screen].displayed = false;
                    }
                }
                $scope.screens.menu.displayed = true;
            }
        };

        var getGoal = function() {
            var deferred = $q.defer();
            var userGoal = goal.getStoredGoal();

            if (userGoal) {
                deferred.resolve(userGoal);
            }
            else {
                goalService.getGoal().then(
                    function(result) {
                        if (result) {
                            userGoal = result;
                            goal.save(userGoal);
                        }
                        else {
                            userGoal = goal.save();
                        }

                        deferred.resolve(userGoal);
                    },
                    function(error) {
                        logger.error(error);
                        deferred.reject(error);
                    }
                );

            }

            return deferred.promise;
        };

        var saveGoal = function(userGoal) {
            var deferred = $q.defer();

            console.log(userGoal.targetAmount);
            goalService.saveGoal(userGoal).then(
                function(result) {
                    deferred.resolve(result);
                },
                function(error) {
                    logger.log(error);
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        $scope.goalNameButtonClicked = function($event)  {
            $event.preventDefault();
            if ($scope.originalUserGoal.name == $scope.userGoal.name) {
                angular.element('#settingsGoalNameInput').focus();
            }
            else {
                $scope.goalFormSubmitted();
            }
        };

        $scope.goalAmountButtonClicked  = function($event) {
            $event.preventDefault();
            $scope.goalFormSubmitted();
            if ($scope.originalUserGoal.name == $scope.userGoal.name) {
                angular.element('#settingsGoalAmountInput').focus();
            }
            else {
                logger.log('saving amount');
            }
        };

        $scope.goalFormSubmitted = function()  {
            goal.save($scope.userGoal);
            saveGoal($scope.userGoal).then(
                function(result) {
                    if ($scope.userGoal.targetAmount && $scope.userGoal.targetAmount != '') {
                        $scope.userGoal.targetAmount = $scope.userGoal.targetAmount.replace(/\$|,/g, '');
                        $scope.userGoal.targetAmount = $scope.userGoal.targetAmount.replace(/\s+/g, '');
                        logger.log($scope.userGoal.targetAmount);
                    }
                    goal.save($scope.userGoal);
                    $scope.originalUserGoal = cloner.clone($scope.userGoal);
                    logger.log(result);
                },

                function(error) {
                    displayModal('Error', 'An error has occured, please try again later', false);
                }
            )
        };

        $scope.emailToggled = function() {
            if ($scope.emailNotification) {
                logger.log('Opted in for email notification');
            }
            else {
                logger.log('Opted out for email notification');
            }
        };

        $scope.submitFeedback = function() {
            logger.log('feedback: ' + $scope.feedback);
            if ($scope.feedback && $scope.feedback != '') {
                displayModal('Thanks!',
                    'We\'re actively working in making this app better.  We appreciate the feedback.!',
                    false, null, null);
                feedbackService.sendFeedback($scope.feedback);
                $scope.feedback = '';
            }
        };

        $scope.undoTransactionPressed = function($event, transactionID) {
            $event.preventDefault();

            var i;
            var transaction;
            for (i = 0; i < $scope.transactions.length; i++) {
                if ($scope.transactions[i]._id == transactionID) {
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
            console.log('transactionID ' + transactionID);
            var i;
            var indexToRemove = -1;
            var undoAmount = 0;
            for (i = 0; i < $scope.transactions.length; i++) {
                if ($scope.transactions[i]._id == transactionID) {
                    indexToRemove = i;
                    undoAmount = $scope.transactions[i].savingsAmount;
                    undoAmount = undoAmount.replace(/\$/g, '');
                    undoAmount = parseFloat(undoAmount);
                    break;
                }
            }

            if (-1 != indexToRemove) {
                savingsService.deleteSavings(transactionID).then(
                    function(success) {
                        $scope.transactions.splice(indexToRemove, 1);
                        getGoal().then(
                            function(userGoal) {
                                logger.log(userGoal);
                                userGoal.amountSaved = userGoal.amountSaved - undoAmount;
                                goal.save(userGoal);
                                $scope.userGoal.amountSaved = userGoal.amountSaved;
                                $scope.originalUserGoal.amountSaved = userGoal.amountSaved;
                                logger.log('updated goal: ');
                                logger.log(undoAmount);

                                logger.log(userGoal);
                                goalService.saveGoal(userGoal);
                            }
                        )
                    },

                    function(error) {
                        logger.log('Error deleting savings' + error);
                        displayModal('Error', 'An error has occured, please try again later', false);
                    }
                );


            }

        };

        $scope.modalOKPressed = function($event, identifier, data){
            $event.preventDefault();
            $scope.modal.visible = false;

            if (identifier == modalIdentifiers.undoTransaction) {
                undoTransaction(data._id);
            }
        };

        $scope.modalCancelPressed = function($event, identifier, data) {
            $event.preventDefault();
            $scope.modal.visible = false;
        };

        $scope.logout = function($event) {
            userService.logout();
        };

        var setup = function() {
            getGoal().then(
                function(userGoal) {
                    $scope.originalUserGoal = userGoal;
                    $scope.userGoal = cloner.clone(userGoal);

                    if (!imageToDisplay) {
                        imageService.getNextImages(userGoal).then(function(result) {
                                imageToDisplay = path+result[0].uri;
                                sharedProperties.set('currentBackgroundImage', imageToDisplay);
                                document.getElementById("backgroundImage").style.background = "url(" + imageToDisplay +") no-repeat center center fixed";
                                document.getElementById("backgroundImage").style.backgroundSize = "auto 100%";
                            },
                            function(error) {
                                logger.log("getting images failed");
                            });


                    }
                },

                function(error) {
                    displayModal('Error', 'An error has occured, please try again later', false);
                }
            );

            savingsService.getSavings().then(
                function(result) {
                    if (result) {
                        $scope.transactions = result;
                        var i;
                        for (i = 0; i < $scope.transactions.length; i++) {
                            var date = dateFromObjectId($scope.transactions[i]._id);
                            $scope.transactions[i].savingsAmount = '$' + $scope.transactions[i].savingsAmount;
                            $scope.transactions[i].date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                        }
                    }
                }
            )

        };

        var dateFromObjectId = function (objectId) {
            return new Date(parseInt(objectId.substring(0, 8 ), 16) * 1000);
        };

        setup();

  }]); 