'use strict';

angular.module('spearmintWebApp')
  .controller('HomeCtrl', ['$scope', '$location', '$analytics', 'logger', 'progressIndicator', 'goal', 'goalService', 'savingsService', 'imageService', 'sharedProperties', 'prettyPrettyBackground',
        function ($scope, $location, $analytics, logger, progressIndicator, goal, goalService, savingsService, imageService, sharedProperties, prettyPrettyBackground) {

    // To Do: delete this code once service to get correct image is created 
    // -------------------------------
    var imageNum = 0;
    var path = '../images/';

    // -------------------------------

   var imageTransitionTime = 3000;
   var blurTime = 700;
   var unblurTime = 700;

   var userAgent = navigator.userAgent || navigator.vendor || window.opera;
   prettyPrettyBackground.initWithCanvas(document.getElementById('imageCanvas'));


   var addToHome = addToHomescreen({ 
      startDelay: 4,
      modal: true, 
      autostart: false,
      message: 'Save anytime by adding Moment to your home screen. Tap the address bar, then tap %icon, then choose <strong>Add to Home Screen</strong>.',
      maxDisplayCount: 1
    }); 
 
    function PreloadImage (src) {
        var img = new Image ();
        img.src = src;
        logger.log(src + " loaded");
        return img; 
    }

    // Messaging for home screen 
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
    }

    var welcomeMessages = ["Skipped the coffee?", "Took the bus today?", "Dinner at home?", "Brought your lunch to work?", "Waited till it went on sale?", 
                          "Bought the generic brand?", "Washed your own car?", "Walked instead of driving?", "Skipped a round of drinks?", "Returned something you didn't need?", 
                          "Bought it off Craigslist?", "Had a date night in?", "Skipped the soda?", "Saw a free concert?", "Got salad instead of steak?", "Worked overtime?",
                          "Coupon clipping?", "Biked to work?", "Borrowed a library book?", "Used a free ATM?", "Coffee at home?"]; 
    var congratsMessages = ["Truly amazing!", "Hip hip horray!", "Quite amazing!", "Great work!", "Three cheers mate!", "Sweet!", "Wonderfully done!", "So great!", 
                            "Way to go champ!", "You rock!", "Terrific!", "Looking sharp!", "Oh my word!", "Woah! Incredible!", "Superior work!", "Quite impressive!", "Top notch!", 
                            "Excellent!", "You're on a roll!", "Oh my gosh!", "Exceptional!", "Wonderful!", "Just what was needed!", "First class!", "Nice job!", "Far out!", 
                            "Legendary!", "Brilliant!", "Impressive!", "Neat-o!", "Cool beans!", "How did you get so good?!", "Beautiful!", "Are you good or what?!", 
                            "Magnificent!", "Bravo!", "World class!", "Unbelievable!", "Rock on!", "You should be very proud!", "Perfection!", "Now you're cooking!",  "Ace job!", 
                            "Props!", "Powerfully done!", "You're on fire!"];


    // SETUP Page with initial message, progress indicator, and load the images to show 

    // get a random set of four messages from the welcome messages
    welcomeMessages = shuffleArray(welcomeMessages); 
    welcomeMessages = welcomeMessages.slice(0,4); 
    var welcomeIndex = 0; 

    // set all of the initial messaging for the home screen
    $scope.suggestionMessage = welcomeMessages[welcomeIndex]; 
    $scope.message = "Press and hold <br/> to <b>Keep</b> the savings.";
    $scope.messageFooter = ""; 
    $scope.holding = false; 

    var textOnScreenTime = 4000; 
    var fadeAndTransitionTime = textOnScreenTime + 500; 
    var welcomeFadeTimer; 
    var welcomeTimer;
    var welcomeFadeOutTimer; 

    var setupWelcomeTimers = function() { 
        // Set timers for fading the welcome text
      welcomeFadeTimer = setTimeout(function(){
          document.getElementById("home-screen-welcome-message").className="opacity-animate-out-welcome";}, textOnScreenTime);
      welcomeFadeOutTimer = setTimeout(function(){
          document.getElementById("home-screen-welcome-message").className="opacity-animate-welcome";}, fadeAndTransitionTime);

      // Set an interval for changing the text of the welcome message
      welcomeTimer = setInterval(function(){
        welcomeFadeTimer = setTimeout(function(){
          document.getElementById("home-screen-welcome-message").className="opacity-animate-out-welcome";}, textOnScreenTime);
        welcomeFadeOutTimer = setTimeout(function(){
          document.getElementById("home-screen-welcome-message").className="opacity-animate-welcome";}, fadeAndTransitionTime);

        welcomeIndex += 1; 
        if (welcomeIndex > (welcomeMessages.length - 1)) { 
          welcomeIndex = 0; 
        }
        $scope.suggestionMessage = welcomeMessages[welcomeIndex]; 
        $scope.$apply()}, fadeAndTransitionTime); 
    };

    setupWelcomeTimers(); 

    // randomize the congrats messages that the suer sees 
    congratsMessages = shuffleArray(congratsMessages); 
    var congratsIndex = 0; 

    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));
    progressIndicator.setMax(99);
    progressIndicator.show();

    var currentImageURL;
    var nextImageURL;
    var fadeMessageTimer, fadeMessageTimer2, fadeMessageTimer3,timersStarted;


    var userGoal = goal.getStoredGoal();
    if (!userGoal) {
    logger.log("no local goal yet, getting one");
    goalService.getGoal().then(
              // success handler
          function(result) {
                goal.save(result);
                userGoal=result;

                if (userGoal.name == "Enter a goal") {
                  $scope.messageFooter = "Money kept: $" + userGoal.amountSaved; 
                } else { 
                  $scope.messageFooter = "Money for " + userGoal.name + ": $" + userGoal.amountSaved; 
                }

                imageService.getNextImages(userGoal).then(function(result) {
                  currentImageURL = path+result[0].uri;
                  nextImageURL = path+result[1].uri; 

                  PreloadImage(currentImageURL);
                  PreloadImage(nextImageURL);
                    logger.log('current image url 1: ' + currentImageURL);
                    if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
                    {
                        document.getElementById("saving-screen").style.backgroundImage = "url(" + currentImageURL +")";
                    }

                    if (prettyPrettyBackground.hasImage()) {
                        prettyPrettyBackground.transitionToImage(currentImageURL, 500, true, new canvasEngine.Color(0,0,0,0.2));
                    }
                    else {
                        prettyPrettyBackground.setImage(currentImageURL, true, new canvasEngine.Color(0,0,0,0.2));
                        prettyPrettyBackground.start();
                    }

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

      if (userGoal.name == "Enter a goal") {
          $scope.messageFooter = "Money kept: $" + userGoal.amountSaved; 
        } else { 
          $scope.messageFooter = "Money for " + userGoal.name + ": $" + userGoal.amountSaved; 
        }

      imageService.getNextImages(userGoal).then(function(result) {

                  currentImageURL = path+result[0].uri; 
                  nextImageURL = path+result[1].uri; 

                  PreloadImage(currentImageURL);
                  PreloadImage(nextImageURL);

                  logger.log('setting background image to: ' + currentImageURL);
              logger.log('current image url 2: ' + currentImageURL);

              if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
              {
                  document.getElementById("saving-screen").style.backgroundImage = "url(" + currentImageURL +")";
              }

              if (prettyPrettyBackground.hasImage()) {
                  prettyPrettyBackground.transitionToImage(currentImageURL, 500, true, new canvasEngine.Color(0,0,0,0.2));
              }
              else {
                  prettyPrettyBackground.setImage(currentImageURL, true, new canvasEngine.Color(0,0,0,0.2));
                  prettyPrettyBackground.start();
              }

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
        clearInterval(welcomeTimer);
        clearTimeout(welcomeFadeTimer);
        clearTimeout(welcomeFadeOutTimer);
    };

    // Reveal the clear image when the user holds down on the screen
    $scope.unblur = function() {
        if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
        {
            document.getElementById("saving-screen").className="unblur";
        }

        prettyPrettyBackground.unblur(unblurTime);

        document.getElementsByClassName("welcome-showMe-fingerprint")[0].className="welcome-showMe-fingerprint";

      $scope.message = ""; 
      $scope.messageFooter = ""; 
      $scope.suggestionMessage = ""; 
      $scope.holding = true;
      clearTimeout(fadeMessageTimer);
      clearTimeout(fadeMessageTimer2);
      clearTimeout(fadeMessageTimer3);
      clearInterval(welcomeTimer);
      clearTimeout(welcomeFadeTimer);
      clearTimeout(welcomeFadeOutTimer);

      progressIndicator.start();
      logger.log("unblur called"); 
    };

    // Reblur the image and begin transition to next image when user releases hold on screen 
    $scope.reblur = function() {
        if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
        {
            document.getElementById("saving-screen").className= "blur blur-animate";
        }

        prettyPrettyBackground.blur(blurTime);

        logger.log("reblur called"); 

      $scope.holding = false; 
      progressIndicator.stop();

      var dollarAmount = progressIndicator.getAmount();

      $analytics.eventTrack('holdRelease', {  category: 'save' , label: 'home_releaseButton', value: dollarAmount });

      document.getElementById("home-screen-message").className="";
      document.getElementsByClassName("welcome-showMe-fingerprint")[0].className="welcome-showMe-fingerprint";

      clearInterval(welcomeTimer);
      clearTimeout(welcomeFadeTimer);
      clearTimeout(welcomeFadeOutTimer);

      progressIndicator.reset(); 
      if(dollarAmount ==0) {
          clearTimeout(fadeMessageTimer);
          clearTimeout(fadeMessageTimer2);
          clearTimeout(fadeMessageTimer3);
          setupWelcomeTimers(); 
        $scope.message = "Press and hold <br/>to <b>Keep</b> the savings.";
      }
      else {
        var userGoal = goal.getStoredGoal();
        if (!userGoal) {
          goalService.getGoal().then(
                // success handler
                function(result) {
                  goal.save(result);
                  logger.log("result from getGoal() " + result);
                  continueReblur(result,dollarAmount);
                },

                // error handler
                function(error) {
                  logger.log('Failed to retrieve goal');
                  logger.error(error);
                }
              )
        } else { 
          continueReblur(userGoal,dollarAmount);
        }
      }
      
    };

    // Continuation of the reblur function 
    var continueReblur = function(userGoal,dollarAmount) { 
      // Get and save user progress toward their goal
      
      userGoal.amountSaved += dollarAmount; 
      goal.save(userGoal); 
      goalService.saveGoal(userGoal);
      var savings = {goalid:userGoal._id, savingsAmount: dollarAmount};

      // Get the congrats message 
      var congrats = congratsMessages[congratsIndex];
      congratsIndex += 1; 
      if (congratsIndex > (congratsMessages.length - 1)) { 
        congratsIndex = 0; 
      }

      // Hide the fingerprint temporarily 
      document.getElementsByClassName("welcome-showMe-fingerprint")[0].style.opacity = 0; 
      document.getElementById("home-screen-message-footer").style.fontWeight = "bold"; 

      // Display messaging to indicate progress 
      if (userGoal.amountSaved > userGoal.targetAmount && userGoal.targetAmount!=0) {
        $scope.message = "Congratulations! You reached your goal!"; 
      } else if (userGoal.amountSaved > 0) {
        $scope.message = congrats + "<br />You just kept $" + dollarAmount;
        if (userGoal.name == "Enter a goal") {
          $scope.messageFooter = "Money kept: $" + userGoal.amountSaved; 
        } else { 
          $scope.messageFooter = "Money for " + userGoal.name + ": $" + userGoal.amountSaved; 
        }
      } else { 
        $scope.message = "You just saved $" + dollarAmount + " Great job!";
      }

      // Wait 1 second for reblur animation to stop, then transition to next image 
      setTimeout(function(){transitionToNextImage()}, 2500);
      timersStarted=true;
      fadeMessageTimer = setTimeout(function(){
        logger.log("fading out");
        document.getElementById("home-screen-welcome-message").className="opacity-animate-out";
        document.getElementById("home-screen-message").className="opacity-animate-out";}, 2500);
      fadeMessageTimer2 = setTimeout(function(){
        logger.log("changing msg");
        $scope.suggestionMessage = welcomeMessages[welcomeIndex];
        $scope.message="Press and hold <br/>to <b>Keep</b> the savings.";
        $scope.$apply()}, 4000);
      fadeMessageTimer3 = setTimeout(function(){
        logger.log("fade in");
        document.getElementsByClassName("welcome-showMe-fingerprint")[0].className="welcome-showMe-fingerprint opacity-animate";
        document.getElementsByClassName("welcome-showMe-fingerprint")[0].style.opacity = 1; 
        document.getElementById("home-screen-message").className="opacity-animate";
        document.getElementById("home-screen-welcome-message").className="opacity-animate";
        setupWelcomeTimers();    
      }, 4200);



      savingsService.createNewSavings(savings);


    };


    var transitionToNextImage = function() { 
      var userGoal = goal.getStoredGoal();

        if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
        {
            document.getElementById("saving-screen").style.backgroundImage = "url(" + nextImageURL +")";
        }

        prettyPrettyBackground.transitionToImage(nextImageURL, imageTransitionTime, true, new canvasEngine.Color(0,0,0,0.2));


      progressIndicator.reset(); 

      logger.log("getting images after transition");
      // Preload the next images to display 
      imageService.getNextImages(userGoal).then(function(result) {

          currentImageURL = path+result[0].uri;
          nextImageURL = path+result[1].uri;
          PreloadImage(nextImageURL);

          addToHome.show();
          logger.log("preloaded:"+nextImageURL);

        },
        function(error) {
          logger.log("getting images failed");
        });

      
    };

}]);




