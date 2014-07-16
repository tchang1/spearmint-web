'use strict';

angular.module('spearmintWebApp')
  .controller('OptinCtrl', ['$scope', '$location', 'paymentsService',
        function ($scope, $location, paymentsService) {

        $scope.optin = function() { 
        	paymentsService.optin(); 
        	$scope.modal.visible = true; 
        };

        $scope.modal = {
            header: 'Great!',
            body: 'We will let you know if you are selected for the beta.',
            buttonText: 'OK',
            data: {},
            visible: false,
        };

        $scope.modalOKPressed = function($event) { 
        	$event.preventDefault(); 
        	$location.path('/settings'); 
        };
}]); 

