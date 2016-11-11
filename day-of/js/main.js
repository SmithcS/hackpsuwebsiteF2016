$(document).ready(function() {
	console.log( "ready!" );
    // $( "#header" ).css( "height", window.innerHeight);

    var imdobile = true;

	if ( window.innerWidth > 600 ) {
		imdobile = false;
	}

	console.log(imdobile)

	if (!imdobile) {


		// scrollyDividers();
		// var index=0,count=0, word, words = ['innovate','learn','build','dream','code','create'];
		// untype()



		$(".animated-icon").hover(
	    	function() {
	    		$(this).addClass('tada');
	    	}, function() {
	    		$(this).removeClass('tada');
	    	}
    	);
    	$('.mobile-only').css('display', 'none');

    	setTimeout(function() {
    		animations();
    	}, 3000);

	} 
})