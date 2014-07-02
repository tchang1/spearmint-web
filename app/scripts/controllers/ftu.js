'use strict';

angular.module('spearmintWebApp')
  .controller('FTUCtrl', ['$scope', '$location', '$analytics', 'logger', 'prettyPrettyBackground', function ($scope, $location, $analytics, logger, prettyPrettyBackground) {

    // var ftuMessages = [
    //   { title: 'Don\'t spend as much!',
    //     description: 'Stop spending and start saving towards what you really want', 
    //     image: 'images/HandIcon.png' 
    //   },
    //   { title: 'Get started with your goals',
    //     description: 'What are your real goals in life? Save up for those! ', 
    //     image: 'images/TargetIcon.png' 
    //   }
    // ];

    // $scope.valueProps = ftuMessages; 
    // $scope.pageNum = 'one';
    // $scope.currentProp = ftuMessages[0];

    //  $scope.next = function() {
    //    $scope.pageNum = 'two'; 
    //    $scope.currentProp = ftuMessages[1];

    //    /* move the divs around and update the pages indicator */ 
    //    /* if we are on the last valueprop then show the set a goal, otherwise show skip, both go to set a goal page */ 
    //  };

    //  $scope.back = function() {
    //    $scope.pageNum = 'one'; 
    //    $scope.currentProp = ftuMessages[0];

    //    /* move the divs around and update the pages indicator */ 
    //    /* if we are on the last valueprop then show the set a goal, otherwise show skip, both go to set a goal page */ 
    //  };
    prettyPrettyBackground.initWithCanvas(document.getElementById('imageCanvas'));
    if (prettyPrettyBackground.hasImage()) {
        prettyPrettyBackground.transitionToImage('/images/FTU/Path.jpg', 500, true, new canvasEngine.Color(0,0,0,0.3));
    }
    else {
        prettyPrettyBackground.setImage('/images/FTU/Path.jpg', true, new canvasEngine.Color(0,0,0,0.3));
        prettyPrettyBackground.start();
    }
    var params= $location.search();
    var variants = new Array(0,1);
    var variant=0;
    if (params.variant && variants.indexOf(parseInt(params.variant))!=-1) {
        variant=parseInt(params.variant);
    }
    logger.log("variant="+variant);

    var messages= new Array(["Let go on the amount you want to contribute. We will keep track of your progress.","The savings add up quickly!"],["Let go on the amount you would have otherwise spent","You'll reach your goal before you know it!"]);

    $scope.message1 = messages[variant][0];
    $scope.message2 = messages[variant][1];

    $scope.setGoal = function() {
      $analytics.eventTrack('linkTap', {  category: 'ftu_goal' , label: 'proceed_to_setGoal'});
      $location.search();
      $location.url($location.path()).path('/setgoal');
    };

  }]);

