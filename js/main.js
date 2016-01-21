$( document ).ready(function() {
    console.log( "ready!" );
    $( "body" ).css( "height", function( index ) {
	  var windowHeight = window.innerHeight;
	  console.log(windowHeight);
	  return windowHeight
	});

    $.fn.hexify = function() {
    	$(this).append($('<div>').addClass('hextop'));
    	$(this).append($('<div>').addClass('hexmiddle'));
    	$(this).append($('<div>').addClass('hexbottom'));
    	return this;
	}


	
	$('.hexagon').each(function( index, element ) {
	    var time = Math.floor(5000 * Math.random());
	    var xcoordstart = window.innerHeight * Math.random();
	    var xcoordend = window.innerHeight * Math.random();
	    $( element ).hexify().offset({top:0,left:xcoordstart}).animate({
			opacity:0.25,
			left: xcoordend,
			top: "+=500"
		},time, "linear");    
	  });

    

});