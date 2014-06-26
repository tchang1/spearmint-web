'use strict';

angular.module('spearmintWebApp')
  .controller('WelcomeCtrl', ['$scope', '$location', '$analytics', 'goalService', 'userService', 'logger', 'progressIndicator',
        function ($scope, $location, $analytics, goalService, userService, logger, progressIndicator) {

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
        logger.log('FTU background image: ' + imageURL);
        document.getElementById("ftu-screen").style.backgroundImage = "url(" + imageURL +")";
//        document.getElementById("ftu-screen").style.backgroundSize = "auto 100%";
    };

    var goToFTU = function() { 
        $scope.holding = false; 
        progressIndicator.stop();
        progressIndicator.reset(); 
        $location.path('/ftu');
        $scope.$apply();
    };

    var rotateImages = function() {
        FTUIndex += 1; 
        logger.log("incrementing index to "+FTUIndex+", rotating images"); 

        var nextImageURL = FTUImages[FTUIndex];
        changeBackground(nextImageURL);
        $scope.message = FTUMessages[FTUIndex]; 
        logger.log(FTUMessages[FTUIndex]);
        $scope.$apply(); 

        $analytics.eventTrack('transition', {  category: 'ftu_screen' , label: 'ftu_imageRotated', value: FTUIndex });


        if (FTUIndex > 2) { 
            // Set a timer once we are on the last screen so that user gets booted to the ftu (set goal) screen after 10 seconds 
            setTimeout(goToFTU, 10000);

            logger.log("Clearing interval");
            clearInterval(timingVar);
            $scope.holding = true; 
            $scope.$apply(); 
            progressIndicator.start();
            logger.log("should see progress indicator");
            $analytics.eventTrack('transition', {  category: 'ftu_screen' , label: 'ftu_spinnerShown'});
            //document.getElementById("release-message").className="opacity-animate";
            releaseMessageTimer = setTimeout(function(){document.getElementById("release-message").className="opacity-animate";}, 3000);
            // logger.log("Go to FTU in 4 secs");
            // setTimeout(goToFTU, 2500);
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
    var FTUImages = ["../images/FTU/cookies.jpg", "../images/FTU/Concert.jpg", "../images/FTU/Piggy-Bank.jpg", "../images/FTU/Travel.jpg", "../images/FTU/Path.jpg"];     
    var FTUMessages = ["The temptation to buy stuff you don't need is everywhere.", 
                        "Which leaves less money for things that are important to your.", 
                        "When you are feeling tempted, press and hold to contribute to your goal.", 
                        "The longer you hold down, the more you contribute to your goal."];
    var timingVar; 
    var releaseMessageTimer; 


    changeBackground(FTUImages[FTUIndex]);
    $scope.message = ""; 
    $scope.firstScreen = true; 
    $scope.onblur = false; 
    $scope.holding = false; 
    $scope.thirdOffense = false; 
    var offenseNum = 0; 

    for (var i = 0; i < FTUImages.length; i++) {
        PreloadImage(FTUImages[i]);
        logger.log("loaded "+ FTUImages[i]);
    }

    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));
    progressIndicator.show();


    // Reveal the clear image when the user holds down on the screen
    $scope.unblur = function() {

        $analytics.eventTrack('holdStart', {  category: 'ftu_hold' , label: 'ftu_index', value: FTUIndex });

        $scope.onblur = false; 
        document.getElementById("ftu-screen").className="unblur";
        $scope.message = FTUMessages[FTUIndex]; 
        $scope.thirdOffense = false; 
        logger.log("index is "+FTUIndex);
        logger.log("called unblur");

        if (FTUIndex < 3) {
            $scope.firstScreen = false; 
            timingVar = setInterval(rotateImages, 3500);
            logger.log("4 sec interval set");
        } else { 
            // Set a timer once we are on the last screen so that user gets booted to the ftu (set goal) screen after 10 seconds 
            setTimeout(goToFTU, 10000);

            $scope.holding = true; 
            progressIndicator.show(); 
            progressIndicator.start();
            logger.log("should see progress indicator");

            var dollarAmount = progressIndicator.getAmount();
            if (dollarAmount < 3 ){
                releaseMessageTimer = setTimeout(function(){document.getElementById("release-message").className="opacity-animate";}, 2000);
            } else {
                document.getElementById("release-message").className="opacity-animate";
            }

        }
    };

    $scope.reblur = function() {
        if (document.getElementById("ftu-screen").className=="unblur") {

            offenseNum += 1;
            $analytics.eventTrack('holdRelease', {  category: 'ftu_hold' , label: 'ftu_index_is_'+FTUIndex , value: offenseNum});
 

            if (offenseNum == 2) {
                document.getElementById("hand-light").src = "../images/FTU/hold_for_4.png"
            } else if (offenseNum > 2) { 
                $scope.thirdOffense = true; 
            }

            $scope.onblur = true; 
            document.getElementById("ftu-screen").className="blur blur-animate";
            $scope.message = ""; 

            logger.log("called reblur");

            if (FTUIndex < 3) {
                clearInterval(timingVar);
                logger.log("index < 2, interval cleared");

            } else {
                var dollarAmount = progressIndicator.getAmount();
                // If they release after saving 3 or more dollars then redirect to set a goal 
                if (dollarAmount > 2) { 
                    $analytics.eventTrack('transition', {  category: 'ftu_screen' , label: 'ftu_finish_goToGoal' , value: offenseNum});

                    goToFTU(); 
                } else { // Otherwise just pause the progress indicator 
                    progressIndicator.stop();
                    progressIndicator.hide();
                    clearTimeout(releaseMessageTimer);
                    document.getElementById("release-message").className="opacity-none"
                    $analytics.eventTrack('holdRelease', {  category: 'ftu_hold' , label: 'ftu_release_before_$2' , value: offenseNum});

                }
            }
        }


    };

  }]); 