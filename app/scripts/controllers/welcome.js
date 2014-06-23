'use strict';

angular.module('spearmintWebApp')
  .controller('WelcomeCtrl', ['$scope', '$location', 'goalService', 'userService', 'logger', 'progressIndicator',
        function ($scope, $location, goalService, userService, logger, progressIndicator) {

    // $scope.getStarted = function() {
    //     $location.path('/ftu');
    // };

    // $scope.login = function() {
    //     $location.path('/login');
    // };

    document.ontouchmove = function(event){
        event.preventDefault();
    };

    var changeBackground = function(imageURL) {
        document.getElementById("ftu-screen").style.background = "url(" + imageURL +") no-repeat center center fixed";
        document.getElementById("ftu-screen").style.backgroundSize = "auto 100%";
    };

    var goToFTU = function() { 
        FTUIndex += 1; 
        $scope.onblur = true; 
        document.getElementById("ftu-screen").className="blur blur-animate";
        $scope.message = ""; 

        $scope.$apply();

        var nextImageURL = FTUImages[FTUIndex];
        changeBackground(nextImageURL);
    };

    var rotateImages = function() {
        FTUIndex += 1; 
        logger.log("incrementing index to "+FTUIndex+", rotating images"); 

        var nextImageURL = FTUImages[FTUIndex];
        changeBackground(nextImageURL);
        $scope.message = FTUMessages[FTUIndex]; 
        logger.log(FTUMessages[FTUIndex]);
        $scope.$apply(); 

        if (FTUIndex > 1) { 
            logger.log("Clearing interval");
            clearInterval(timingVar);
            logger.log("Go to FTU in 4 secs");
            setTimeout(goToFTU, 2500);
        }
    };

    function PreloadImage (src) {
        var img = new Image ();
        img.src = src;
        logger.log(src + " loaded");
        return img; 
    };

    //SETUP first image 
    var FTUIndex = 0; 
    var FTUImages = ["../images/FTU/cookies.jpg", "../images/FTU/Concert.jpg", "../images/FTU/Piggy-Bank.jpg", "../images/FTU/Travel.jpg", "../images/Path.jpg"];     
    var FTUMessages = ["The temptation to buy stuff you don't need is everywhere.", 
                        "Which leaves less money to do the things you really want to do.", 
                        "When you are feeling tempted, press and hold to contribute to your goal.", 
                        "The longer you hold down, the more you contribute to your goal."];
    var timingVar; 


    changeBackground(FTUImages[FTUIndex]);
    $scope.message = ""; 
    $scope.firstScreen = true; 
    $scope.onblur = false; 
    $scope.holding = false; 
    var repressOccured = false; 

    for (var i = 0; i < FTUImages.length; i++) {
        PreloadImage(FTUImages[i]);
        logger.log("loaded "+ FTUImages[i]);
    }

    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));
    progressIndicator.show();


    // Reveal the clear image when the user holds down on the screen
    $scope.unblur = function() {
        $scope.onblur = false; 
        document.getElementById("ftu-screen").className="unblur";
        $scope.message = FTUMessages[FTUIndex]; 
        logger.log("index is "+FTUIndex);
        logger.log("called unblur");

        if (FTUIndex < 2) {
            $scope.firstScreen = false; 
            timingVar = setInterval(rotateImages, 2500);
            logger.log("4 sec interval set");
        } else { 
            $scope.holding = true; 
            progressIndicator.start();
            logger.log("should see progress indicator");

        }
    };

    $scope.reblur = function() {
        if (document.getElementById("ftu-screen").className=="unblur") {

            $scope.onblur = true; 
            document.getElementById("ftu-screen").className="blur blur-animate";
            $scope.message = ""; 

            logger.log("called reblur");

            if (FTUIndex < 2) {
                clearInterval(timingVar);
                logger.log("index < 2, interval cleared");

            } else if (FTUIndex == 2) { 
                clearInterval(timingVar);
                logger.log("index is 2, interval cleared");

                //goToFTU();
            //}
            // } else if (repressOccured) { 
            //     $scope.holding = false; 
            //     progressIndicator.stop();
            //     $location.path('/ftu');
            } else {
                $scope.holding = false; 
                //repressOccured = true;
                progressIndicator.stop();
                progressIndicator.reset(); 
                $location.path('/ftu');
 
            }
        }


    };


//    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));
//
//    progressIndicator.show();
//
//    document.onmousedown=function(){
//        progressIndicator.start();
//    };
//
//    document.onmouseup=function(){
//        progressIndicator.stop();
//        var dollarAmount = progressIndicator.getAmount();
//    };
    // example of how to log in and retrieve the user's goal

    // userService.login('test', 'test123').then(
    // function(result) {
    //     logger.log('Result: ' + result);
    //     goalService.getGoal().then(
    //         // success handler
    //         function(result) {
    //             logger.log(result);
    //         },

    //         // error handler
    //         function(error) {
    //             logger.error(error);
    //         }
    //     )
    //     },

    //     function(error) {
    //         logger.error(error);
    //     }
    // );

  }]); 