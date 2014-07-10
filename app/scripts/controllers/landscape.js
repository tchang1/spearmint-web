// Listen for resize changes
//    var mql = window.matchMedia("(max-device-width:768px)");

    var setupLandscapeListener=function() {
        console.log(window.innerWidth);
        if (window.innerWidth > 800) {
            var element = document.getElementById("ftu-screen");
            if (element) {
                element.style.backgroundImage="";
            }
            element = document.getElementById('imageCanvas');
            if (element) {
                console.log('hiding canvas');
                canvasEngine.disable();
                document.getElementById('imageCanvas').style.display="none";
            }
            element = document.getElementById('get-started-button');
            if (element) {
                console.log('hiding get started button');
                element.style.display='none';
            }

        }
        else {
            window.addEventListener("resize", function() {
                setTimeout(function() {
                    //var slackPercent = 0.3;
                    $('#landscape').show();
                    //console.log(window.orientation); 
                    //if( window.innerWidth - (window.innerWidth * slackPercent) > window.innerHeight )
                    if (window.orientation == 0 )
                    {
                        $('#landscape').hide();
                        setTimeout(function(){ window.scrollTo(0, 0); }, 100);
                    }
                    else{
                        console.log('rotated');
                        window.scrollTo(1,1);
                        $('#landscape').show();

                        // If the user is typing in an input area or text field, remove focus from
                        // that element so that the keyboard closes.
                        $('input:focus').blur();
                        $('textarea:focus').blur();
                    }
                }, 500);


            }, false);
        }
    };
    //Add a listener to the MediaQueryList
setupLandscapeListener();

