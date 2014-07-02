// Listen for resize changes
    window.addEventListener("resize", function() {
    setTimeout(function() {
        var slackPercent = 0.2;
        $('#landscape').show();
        if( window.outerWidth - (window.outerWidth * slackPercent) > window.outerHeight )
        {
            window.scrollTo(1,1);
            $('#landscape').show();

            // If the user is typing in an input area or text field, remove focus from
            // that element so that the keyboard closes.
            $('input:focus').blur();
            $('textarea:focus').blur();
        }
        else{
            $('#landscape').hide();
            setTimeout(function(){ window.scrollTo(0, 0); }, 100);
        }
    }, 500);

 
    }, false);
