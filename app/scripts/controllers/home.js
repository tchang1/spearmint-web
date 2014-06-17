'use strict';

angular.module('spearmintWebApp')
  .controller('HomeCtrl', ['$scope', '$location', 'logger', 'progressIndicator',function ($scope, $location, logger, progressIndicator) {

    $scope.unblur = function() {
      document.getElementById("saving-screen").className="";
      progressIndicator.start();
      logger.log("unblur called"); 
    };

    $scope.reblur = function() {
      document.getElementById("saving-screen").className=" blur";
      progressIndicator.stop();
      var dollarAmount = progressIndicator.getAmount();
      logger.log("reblur called"); 
    };

    var getImages = function(goal) {
      var folderName = goal; // To Do: put in function that gets folder name based on goal 
      var path = '../images/' + folderName; 
      return [path +'/image1.jpg', path + '/image2.jpg'];
    };

    var getImageToDisplay = function(goal, number) {
      return getImages(goal)[number];
    }

   progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));

   progressIndicator.show();

    // To Do: set this based on the goal of the current user 
    document.getElementById("saving-screen").style.background = "url(" + getImageToDisplay('travel',1) +") no-repeat center center fixed";
    document.getElementById("saving-screen").style.backgroundSize = "100% 100%";

    logger.log(getImageToDisplay('travel',0)); 

  }]); 