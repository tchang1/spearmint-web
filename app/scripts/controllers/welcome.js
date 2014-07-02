'use strict';

angular.module('spearmintWebApp')
  .controller('WelcomeCtrl', ['$scope', '$location', '$analytics', 'goalService', 'userService', 'logger', 'progressIndicator', 'prettyPrettyBackground',
        function ($scope, $location, $analytics, goalService, userService, logger, progressIndicator, prettyPrettyBackground) {

    // $scope.getStarted = function() {
    //     $location.path('/ftu');
    // };

    // $scope.login = function() {
    //     $location.path('/login');
    // };

    var goToFTUTimer;
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var params= $location.search();
    var variants = new Array(0,1);
    var variant=0;
    if (params.variant && variants.indexOf(parseInt(params.variant))!=-1) {
        variant=parseInt(params.variant);
    }
    logger.log("variant="+variant);

    prettyPrettyBackground.initWithCanvas(document.getElementById('imageCanvas'));

    document.ontouchmove = function(event){
        event.preventDefault();
    };

    var changeBackground = function(imageURL) {
        if (prettyPrettyBackground.hasImage()) {
            prettyPrettyBackground.transitionToImage(imageURL, 1000, false, new canvasEngine.Color(0,0,0,.2));
        }
        else {
            prettyPrettyBackground.setImage(imageURL, true, new canvasEngine.Color(0,0,0,.2));
            prettyPrettyBackground.start();
        }

        if((userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )) {
//            logger.log('FTU background image: ' + imageURL);
            document.getElementById("ftu-screen").style.backgroundImage = "url(" + imageURL +")";
        }

    };

    var goToFTU = function() {
        clearTimeout(goToFTUTimer);
        $scope.holding = false;
        progressIndicator.stop();
        progressIndicator.reset();

        $location.search("variant",""+variant).path('/ftu');
        $scope.$apply();
    };

    var rotateImages = function() {
        FTUIndex += 1; 
        logger.log("incrementing index to "+FTUIndex+", rotating images"); 

        var nextImageURL = FTUImages[FTUIndex];
        changeBackground(nextImageURL);
        $scope.message = FTUMessages[variant][FTUIndex]; 
        logger.log(FTUMessages[variant][FTUIndex]);
        $scope.$apply(); 

        $analytics.eventTrack('transition', {  category: 'ftu_screen' , label: 'ftu_imageRotated_to_'+FTUIndex, value: FTUIndex });


        if (FTUIndex > 2) { 
            // Set a timer once we are on the last screen so that user gets booted to the ftu (set goal) screen after 10 seconds 
            goToFTUTimer = setTimeout(goToFTU, 10000);

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
        } else if (FTUIndex == 2) { // If we are on the piggy bank image
            clearInterval(timingVar);
            timingVarPiggyBank = setTimeout(rotateImages, 5000);
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
    var FTUMessages = [["The temptation to buy stuff you don't need is everywhere.", 
                        "Which leaves less money for things that are important to you.", 
                        "When you are feeling tempted, press and hold to contribute to your goal.", 
                        "The longer you hold down, the more you contribute to your goal."],
                        ["The temptation to buy stuff is everywhere", 
                        "Which leaves less money for what's important to you", 
                        "When you skip a purchase, press and hold to contribute to something important instead", 
                        "The longer you hold, the more you contribute"]];
    var timingVar; 
    var timingVarPiggyBank; 
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

        $analytics.eventTrack('holdStart', {  category: 'ftu_hold' , label: 'ftu_index_is_'+FTUIndex, value: FTUIndex });

        $scope.onblur = false;
        if((userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )) {
            document.getElementById("ftu-screen").className="unblur";
        }
        prettyPrettyBackground.unblur(1000);
        $scope.message = FTUMessages[variant][FTUIndex];
        $scope.thirdOffense = false; 
        logger.log("index is "+FTUIndex);
        logger.log("called unblur");

        if (FTUIndex < 2) {
            $scope.firstScreen = false; 
            timingVar = setInterval(rotateImages, 3500);
            logger.log("4 sec interval set");
        } else if (FTUIndex == 2) { 
            timingVarPiggyBank = setTimeout(rotateImages, 5000);
        }
            else { 
            // Set a timer once we are on the last screen so that user gets booted to the ftu (set goal) screen after 10 seconds 
            goToFTUTimer = setTimeout(goToFTU, 10000);

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
        var isBlurred = !prettyPrettyBackground.isBlurred();

        if((userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )) {
            isBlurred = document.getElementById("ftu-screen").className=="unblur";
        }


            if (isBlurred) {

            offenseNum += 1;
            $analytics.eventTrack('holdRelease', {  category: 'ftu_hold' , label: 'ftu_index_is_'+FTUIndex , value: offenseNum});
 

            if (offenseNum == 2) {
                document.getElementById("hand-light").src = "../images/FTU/hold_for_4.png"
            } else if (offenseNum > 2) { 
                $scope.thirdOffense = true; 
            }


            logger.log("called reblur");

            if (FTUIndex < 3) {
                clearInterval(timingVar);
                clearInterval(timingVarPiggyBank);
                logger.log("index < 3, interval cleared");
                continueReblur();

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
                    continueReblur(); 

                }
            }
        }


    };

    var continueReblur = function() { 
        $scope.onblur = true;
        if((userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )) {
            document.getElementById("ftu-screen").className="blur blur-animate";
        }
        prettyPrettyBackground.blur(1000);
        $scope.message = ""; 
    };

  }]); 