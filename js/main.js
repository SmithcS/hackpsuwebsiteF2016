$( document ).ready(function() {
    console.log( "ready!" );
    $( "#content" ).css( "height", window.innerHeight);

    var isMobile = true;

	if ( screen.width > 700 ) {
		isMobile = false;
	} else {
		isMobile = true;
	}

	if(isMobile) {
		
	 
	} else {
		animations();


	}
    

});