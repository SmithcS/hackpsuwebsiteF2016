$( document ).ready(function() {
    console.log( "ready!" );
    $( "body" ).css( "height", function( index ) {
	  var windowHeight = window.innerHeight;
	  console.log(windowHeight);
	  return windowHeight
	});


    $('.hexagon').append("<p>Test</p>");


	// $('.hexagon').animate({
	// 	opacity:0.25,
	// 	top: "+=500"
	// },1000);
    

});