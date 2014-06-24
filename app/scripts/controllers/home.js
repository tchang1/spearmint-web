'use strict';

angular.module('spearmintWebApp')
  .controller('HomeCtrl', ['$scope', '$location', 'logger', 'progressIndicator', 'goal', 'goalService', 'savingsService', 'imageService', 'sharedProperties',
        function ($scope, $location, logger, progressIndicator, goal, goalService, savingsService, imageService, sharedProperties) {

    // To Do: delete this code once service to get correct image is created 
    // -------------------------------
    var imageNum = 0;
    var path = '../images/';

    // -------------------------------

 
    function PreloadImage (src) {
        var img = new Image ();
        img.src = src;
        logger.log(src + " loaded");
        return img; 
    }

    // SETUP Page with initial message, progress indicator, and load the images to show 
    $scope.message = "Tap and hold to save";
    $scope.messageFooter = ""; 
    $scope.holding = false; 

    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));
    progressIndicator.show();

    var currentImageURL;
    var nextImageURL;

    var userGoal = goal.getStoredGoal();
    if (!userGoal) {
    logger.log("no local goal yet, getting one");
    goalService.getGoal().then(
              // success handler
          function(result) {
                goal.save(result);
                userGoal=result;
                imageService.getNextImages(userGoal).then(function(result) {
                  currentImageURL = path+result[0].uri;
                  nextImageURL = path+result[1].uri; 

                  PreloadImage(currentImageURL);
                  PreloadImage(nextImageURL);

                  document.getElementById("saving-screen").style.background = "url(" + currentImageURL +") no-repeat center center fixed";
                  document.getElementById("saving-screen").style.backgroundSize = "auto 100%";
                },
                function(error) {
                  logger.log("getting images failed");
                });
          },

          // error handler
          function(error) {
            logger.log('Failed to retreive goal');
            logger.error(error);
          }
        ) // To Do: change this to call back end function that returns 
    }
    else {
      logger.log("local goal , using it");

      imageService.getNextImages(userGoal).then(function(result) {

                  currentImageURL = path+result[0].uri; 
                  nextImageURL = path+result[1].uri; 

                  PreloadImage(currentImageURL);
                  PreloadImage(nextImageURL);

                  document.getElementById("saving-screen").style.background = "url(" + currentImageURL +") no-repeat center center fixed";
                  document.getElementById("saving-screen").style.backgroundSize = "auto 100%";
                },
                function(error) {
                  logger.log("getting images failed");
      });
    }
    document.ontouchmove = function(event){
      event.preventDefault();
    };

    $scope.storeCurrentImage = function() {
        sharedProperties.set('currentBackgroundImage', currentImageURL);
    };

    // Reveal the clear image when the user holds down on the screen
    $scope.unblur = function() {
      document.getElementById("saving-screen").className="unblur";
      $scope.message = ""; 
      $scope.messageFooter = ""; 
      $scope.holding = true; 
      progressIndicator.start();
      logger.log("unblur called"); 
    };

    // Reblur the image and begin transition to next image when user releases hold on screen 
    $scope.reblur = function() {
      document.getElementById("saving-screen").className= "blur blur-animate";
      $scope.holding = false; 
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
      var savings = {goalid:userGoal._id, savingsAmount: dollarAmount};

      // Display messaging to indicate progress 
      if (dollarAmount == 0) { 
        $scope.message = "Tap and hold to save";
      } else if (userGoal.amountSaved > userGoal.targetAmount) {
        $scope.message = "Congratulations! You reached your goal!"; 
      } else if (userGoal.amountSaved > 0) {
        $scope.message = "You just saved $" + dollarAmount;
        $scope.messageFooter = "Total saved so far is $" + userGoal.amountSaved; 
      } else { 
        $scope.message = "You just saved $" + dollarAmount + " Great job!";
      }

      // Wait 1 second for reblur animation to stop, then transition to next image 
      setTimeout(function(){transitionToNextImage(userGoal)}, 1000);
      progressIndicator.reset(); 
      savingsService.createNewSavings(savings);


    };


    var transitionToNextImage = function(userGoal) { 
      var userGoal = goal.getStoredGoal(); 

      document.getElementById("saving-screen").style.background = "url(" + nextImageURL +") no-repeat center center fixed";
      document.getElementById("saving-screen").style.backgroundSize = "auto 100%";


      progressIndicator.reset(); 

      logger.log("getting images after transition");
      // Preload the next images to display 
      imageService.getNextImages(userGoal).then(function(result) {

          currentImageURL = path+result[0].uri;
          nextImageURL = path+result[1].uri;
          PreloadImage(nextImageURL);

        },
        function(error) {
          logger.log("getting images failed");
        });

      
    };

}]);




