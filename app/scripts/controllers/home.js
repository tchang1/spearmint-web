'use strict';

angular.module('spearmintWebApp')
  .controller('HomeCtrl', ['$scope', '$location', 'logger', 'progressIndicator', 'goal', 'goalService', function ($scope, $location, logger, progressIndicator, goal, goalService) {

     // To Do: delete this code once service is created 
    // -------------------------------
    var currentImage = 0; 

    var goalFolders = ["pet", "travel"];

    var getImages = function(goal) {
      var folderName = goal; 
      var path; 
      if (goalFolders.indexOf(folderName) > -1) {
        path = '../images/' + folderName; 
      } else { 
        path = '../images/nogoal';
      }
      return [path +'/image1.jpg', path + '/image2.jpg', path + '/image3.jpg'];
    };

    var getImageToDisplay = function(goal, number) {
      return getImages(goal)[number];
    };
    // -------------------------------

    $scope.message = "Push and hold to Save";
    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));

    progressIndicator.show();

    // To Do: change this to call back end function that returns 
    var userGoal = goal.getStoredGoal(); 
    var image = getImageToDisplay("travel", currentImage); 

    document.getElementById("saving-screen").style.background = "url(" + image +") no-repeat center center fixed";
    document.getElementById("saving-screen").style.backgroundSize = "auto 100%";
    // document.getElementById("saving-screen-bottom").style.background = "url(" + image +") no-repeat center center fixed";
    // document.getElementById("saving-screen-bottom").style.backgroundSize = "auto 100%";

    document.ontouchmove = function(event){
      event.preventDefault();
    }

    $scope.unblur = function() {
      document.getElementById("saving-screen").className="unblur";
      //document.getElementById("saving-screen-bottom").className="unblur";
      $scope.message = ""; 
      progressIndicator.start();
      logger.log("unblur called"); 
    };

    $scope.reblur = function() {
      document.getElementById("saving-screen").className= "blur";
      //document.getElementById("saving-screen-bottom").className= "blur";
      progressIndicator.stop();

      var userGoal = goal.getStoredGoal(); 
      if (!userGoal) { 
        goalService.getGoal().then(
              // success handler
              function(result) {
                goal.save(result);
                logger.log("result from getGoal() " + result);
                continueReblur(result);
              },

              // error handler
              function(error) {
                logger.log('Failed to retreive goal');
                logger.error(error);
              }
            )
      } else { 
        continueReblur(userGoal);
      }
      
    };

    var continueReblur = function(userGoal) { 
      logger.log("before save: " + userGoal); 

      var dollarAmount = progressIndicator.getAmount();
      userGoal.amountSaved += dollarAmount; 
      goal.save(userGoal); 

      if (userGoal.amountSaved > userGoal.targetAmount) {
        $scope.message = "Congratulations! You have reached your goal of saving " + userGoal.targetAmount + ". Now you can " + userGoal.name + "!"; 
      } else if (userGoal.amountSaved > 0) {
        $scope.message = "You just saved $" + dollarAmount + " towards your goal of " + userGoal.name + ". Total saved so far: $" + userGoal.amountSaved; 
      } else { 
        $scope.message = "You just saved $" + dollarAmount + " Great job!";
      }

      progressIndicator.reset(); 

      goalService.saveGoal(userGoal);


      //setTimeout(function(){transitionToNextImage(userGoal)}, 2000);

      transitionToNextImage(userGoal);


      logger.log("after save: " + userGoal); 

      logger.log("reblur called"); 
    };

    var resetImage = function(image) { 
      document.getElementById("saving-screen").style.background = "url(" + image +") no-repeat center center fixed";
      document.getElementById("saving-screen").style.backgroundSize = "auto 100%";
      document.getElementById("saving-screen").className = "blur";
    };

    var transitionToNextImage = function(userGoal) { 
      var userGoal = goal.getStoredGoal(); 

      currentImage += 1; 
      if (currentImage > 2) { 
        currentImage = 0; 
      }
      logger.log(currentImage);

      var image = getImageToDisplay("travel", currentImage); 
      logger.log(image);

      document.getElementById("saving-screen").style.background = "url(" + image +") no-repeat center center fixed";
      document.getElementById("saving-screen").style.backgroundSize = "auto 100%";
      // document.getElementById("saving-screen").className = "transition blur";

      // setTimeout(function() {resetImage(image)}, 3000); 

    };



  }]);




