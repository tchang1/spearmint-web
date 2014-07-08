'use strict';

angular.module('spearmintWebApp')
  .controller('WelcomeCtrl', ['$scope', '$location', '$timeout', '$analytics', 'goalService', 'userService', 'logger', 'progressIndicator', 'prettyPrettyBackground',
        function ($scope, $location, $timeout, $analytics, goalService, userService, logger, progressIndicator, prettyPrettyBackground) {

    // $scope.getStarted = function() {
    //     $location.path('/ftu');
    // };

    // $scope.login = function() {
    //     $location.path('/login');
    // };
    //Prepare a MediaQueryList
    var mql = window.matchMedia("(max-width:768px)");

    var handleMatchMedia=function(mql) {
        if (mql.matches) {
            document.getElementById('imageCanvas').style.display="block";
            //is mobile width
        }
        else {
            document.getElementById("ftu-screen").style.backgroundImage="";
            document.getElementById('imageCanvas').style.display="none";
        }
    };
    //Add a listener to the MediaQueryList
    mql.addListener(handleMatchMedia);
    handleMatchMedia(mql);

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
           prettyPrettyBackground.transitionToImage(imageURL, 1000, true, new canvasEngine.Color(0,0,0,.2));
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

        $scope.showTotal=false;
        var nextImageURL = FTUImages[FTUIndex];
        changeBackground(nextImageURL);
        $scope.message = blurMessages[variant][FTUIndex];
        logger.log($scope.message);
        $scope.releaseMessage= releaseMessages[FTUIndex];
        $scope.fingerMessage= fingerMessages[FTUIndex];
        $scope.totalMessage= totalMessages[FTUIndex];
        



        if (FTUIndex>0) {
            $scope.showMe=true;      
        }


        $analytics.eventTrack('transition', {  category: 'ftu_screen' , label: 'ftu_changeIndex_to_'+FTUIndex, value: FTUIndex });

        /**
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
        **/
    };

    function PreloadImage (src) {
        var img = new Image ();
        img.src = src;
        logger.log(src + " loaded");
        return img; 
    };

    //SETUP first image 
    var FTUIndex = 0; 
    var FTUImages = ["../images/FTU/ireland.jpg", "../images/FTU/ireland.jpg", "../images/FTU/ridge.jpg"];     
    
    var blurMessages = [["","When you decided to skip the $3 coffee that you usually buy...",
                        "When you decided to take a $2 bus over a $10 cab"]];
    var unblurMessages = [["","Release the screen on the amount that you will keep. In this case $3", 
                        "Everytime you record keeping something you get to see a new photo"]];                    
    var fingerMessages = ["","to <b>keep</b> the $3 for your goal instead",
                        "to <b>keep</b> the difference"];
    var releaseMessages = ["","Release the screen",
                        "When the timer reaches the amount you Kept, release the screen"];
    var totalMessages = ["","Each time you use keep we will add to your goal",
                        "People reach their goals faster with keep."];
    var holdMessages = ["Keep holding",
                        "Keep holding until you reach $3",
                        "Keep holding until you reach $8"];      
    var timingVar; 
    var timingVarPiggyBank; 
    var releaseMessageTimer;
    var rotateTimer;


    changeBackground(FTUImages[FTUIndex]);
    $scope.message = "";
    $scope.releaseMessage="";
    $scope.findgerMessage="";
    $scope.holdMessage="Keep Holding";
    $scope.firstScreen = true; 
    $scope.onblur = false;
    $scope.showMe=false;
    $scope.holding = false; 
    $scope.thirdOffense = false;
    $scope.showTotal=false;

    var offenseNum = 0; 

    for (var i = 0; i < FTUImages.length; i++) {
        PreloadImage(FTUImages[i]);
        logger.log("loaded "+ FTUImages[i]);
    }

    progressIndicator.initWithCanvas(document.getElementById('progressIndicator'));
    progressIndicator.show();
    progressIndicator.setSpeed(-0.5);
    progressIndicator.setMax(3); 


    $scope.getStarted = function() {
        $scope.firstScreen =false;
        logger.log("getStarted");
        $analytics.eventTrack('linkTap', {  category: 'ftu_screen' , label: 'ftu_getStarted', value: FTUIndex });

        rotateImages();
    };

    $scope.continue = function() {
        $analytics.eventTrack('linkTap', {  category: 'ftu_screen' , label: 'ftu_continue', value: FTUIndex });
        rotateImages();
    };

    // Reveal the clear image when the user holds down on the screen
    $scope.unblur = function() {
    if ($scope.firstScreen || $scope.showTotal) {
        return;
    }

        $analytics.eventTrack('holdStart', {  category: 'ftu_hold' , label: 'ftu_index_is_'+FTUIndex, value: offenseNum });
        $scope.showMe=false;

        $scope.onblur = false;
        if((userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )) {
            document.getElementById("ftu-screen").className="unblur";
        }
        prettyPrettyBackground.unblur(1000);
        $scope.message = unblurMessages[variant][FTUIndex];
        $scope.thirdOffense = false; 
        logger.log("index is "+FTUIndex);
        logger.log("called unblur");
        $scope.holding = true; 

   
            progressIndicator.show();
            progressIndicator.start();


            var dollarAmount = progressIndicator.getAmount();
            if (dollarAmount < 3 ){
                releaseMessageTimer = setTimeout(function(){document.getElementById("release-message").className="opacity-animate";}, (3-dollarAmount)*2000);

            } else {
                document.getElementById("release-message").className="opacity-animate";
            }
        
    };

    $scope.reblur = function() {
        if ($scope.firstScreen || $scope.showTotal) {
        return;
        }
        var isBlurred = !prettyPrettyBackground.isBlurred();

        if((userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )) {
            isBlurred = document.getElementById("ftu-screen").className=="unblur";
        }


            if (isBlurred) {

            offenseNum += 1;
            $analytics.eventTrack('holdRelease', {  category: 'ftu_hold' , label: 'ftu_index_is_'+FTUIndex , value: offenseNum});
 

            if (offenseNum == 2) {
                $scope.holdMessage=holdMessages[FTUIndex];
            } else if (offenseNum > 2) {
                $scope.thirdOffense = true; 
            }


            logger.log("called reblur");

            
            var dollarAmount = progressIndicator.getAmount();
            logger.log("amount is "+dollarAmount);
                // If they release after saving 3 or more dollars then redirect to set a goal 
                if (FTUIndex==1 && dollarAmount == 3) {
                    clearTimeout(releaseMessageTimer);
                    progressIndicator.stop();
                    progressIndicator.reset();
                    progressIndicator.setMax(8);
                    progressIndicator.setSpeed(0);

                    progressIndicator.hide();
                    document.getElementById("release-message").className="opacity-none"
                    $analytics.eventTrack('transition', {  category: 'ftu_screen' , label: 'ftu_goToContinue' , value: offenseNum});
                    $scope.message = "";
                    showResult();
                    continueReblur(false);
                } 
                else if (FTUIndex==2 && dollarAmount ==8) {
                    $analytics.eventTrack('transition', {  category: 'ftu_screen' , label: 'ftu_goToGoalFTU' , value: offenseNum});
                    continueReblur(false);
                    $timeout(goToFTU,1000);
                }
                else { // Otherwise just pause the progress indicator
                    clearTimeout(releaseMessageTimer); 
                    progressIndicator.stop();
                    progressIndicator.hide();
                    document.getElementById("release-message").className="opacity-none"
                    $analytics.eventTrack('transition', {  category: 'ftu_hold' , label: 'ftu_release_before_target' , value: offenseNum});
                    $scope.message = "";
                    continueReblur(true); 

                }
            
        }


    };

    var showResult = function() {
        $scope.showTotal=true;
        $scope.messageFooter= "Total Kept: <b>$3</b>";
        logger.log("setting timer for rotate");
        $scope.offenseNum=0;
        //rotateTimer= $timeout(rotateImages,4000);
    }

    var continueReblur = function(setOnBlur) { 
        $scope.onblur = setOnBlur;
        if((userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )) {
            document.getElementById("ftu-screen").className="blur blur-animate";
        }
        prettyPrettyBackground.blur(1000);
         
    };

  }]); 