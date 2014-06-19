'use strict';

angular.module('spearmintWebApp')
  .controller('HomeCtrl', ['$scope', '$location', 'logger', 'progressIndicator', 'goal', 'goalService', function ($scope, $location, logger, progressIndicator, goal, goalService) {

    // To Do: delete this code once service to get correct image is created 
    // -------------------------------
    var imageNum = 0; 

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

 
    function PreloadImage (src) {
        var img = new Image ();
        img.src = src;
        logger.log(src + " loaded");
        return img; 
    }

    // SETUP Page with initial message, progress indicator, and load the images to show 
    $scope.message = "Push and hold to Save";

    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));
    progressIndicator.show();

    var userGoal = goal.getStoredGoal(); // To Do: change this to call back end function that returns 
    var currentImageURL = getImageToDisplay("travel", imageNum); 
    imageNum = (imageNum +1)%3;
    var nextImageURL = getImageToDisplay("travel", imageNum); 

    PreloadImage(currentImageURL);
    PreloadImage(nextImageURL);

    document.getElementById("saving-screen").style.background = "url(" + currentImageURL +") no-repeat center center fixed";
    document.getElementById("saving-screen").style.backgroundSize = "auto 100%";

    document.ontouchmove = function(event){
      event.preventDefault();
    }

    // Reveal the clear image when the user holds down on the screen
    $scope.unblur = function() {
      document.getElementById("saving-screen").className="unblur";
      $scope.message = ""; 
      progressIndicator.start();
      logger.log("unblur called"); 
    };

    // Reblur the image and begin transition to next image when user releases hold on screen 
    $scope.reblur = function() {
      document.getElementById("saving-screen").className= "blur blur-animate";
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

    // Continuation of the reblur function 
    var continueReblur = function(userGoal) { 
      // Get and save user progress toward their goal
      var dollarAmount = progressIndicator.getAmount();
      userGoal.amountSaved += dollarAmount; 
      goal.save(userGoal); 
      goalService.saveGoal(userGoal);

      // Display messaging to indicate progress 
      if (userGoal.amountSaved > userGoal.targetAmount) {
        $scope.message = "Congratulations! You have reached your goal of saving " + userGoal.targetAmount + ". Now you can " + userGoal.name + "!"; 
      } else if (userGoal.amountSaved > 0) {
        $scope.message = "You just saved $" + dollarAmount + " towards your goal of " + userGoal.name + ". Total saved so far: $" + userGoal.amountSaved; 
      } else { 
        $scope.message = "You just saved $" + dollarAmount + " Great job!";
      }

      // Wait 1 second for reblur animation to stop, then transition to next image 
      setTimeout(function(){transitionToNextImage(userGoal)}, 1000);

    };


    var transitionToNextImage = function(userGoal) { 
      var userGoal = goal.getStoredGoal(); 

      document.getElementById("saving-screen").style.background = "url(" + nextImageURL +") no-repeat center center fixed";
      document.getElementById("saving-screen").style.backgroundSize = "auto 100%";


      progressIndicator.reset(); 

      // Preload the next images to display 
      imageNum = (imageNum +1)% 3; 
      currentImageURL = nextImageURL; 
      nextImageURL = getImageToDisplay("travel", imageNum); // To Do: make the image reflect user goal 
      PreloadImage(nextImageURL);

    };

}]);




