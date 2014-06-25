// Listen for resize changes
    window.addEventListener("resize", function() {
 
          if( window.outerWidth > window.outerHeight )
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
             }
 
    }, false);