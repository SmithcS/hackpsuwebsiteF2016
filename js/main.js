$( document ).ready(function() {
    console.log( "ready!" );
    $( "body" ).css( "height", window.innerHeight);

    $.fn.hexify = function() {
    	$( this ).append($('<div>').addClass('hextop'));
    	$( this ).append($('<div>').addClass('hexmiddle'));
    	$( this ).append($('<div>').addClass('hexbottom'));
    	return this;
	}

	$.fn.animatesShapes = function(toggle) {

		var time = 2500 + Math.floor(2500 * Math.random());

    	$( this ).css("opacity",1);

		if ( toggle ) {
			var yCoordEnd = "+=80%";
		} else {
			yCoordEnd = "-=80%";
		}		

		$( this ).animate({
			opacity: 0.25,
			left: window.innerHeight * Math.random(),
			top: yCoordEnd
		},time, "linear", function(){
			toggle = !toggle;
			$(this).animatesShapes(toggle);
		});

		return this
	}

	function spawn(numberOfHexagons, totalHexagons) {
	    $( 'body' ).append($('<div>').addClass('hexagon'));
	    console.log(numberOfHexagons);
	    numberOfHexagons++;
	    if( numberOfHexagons < totalHexagons ){
	        setTimeout( spawn(numberOfHexagons, totalHexagons), 3000 );
	    }
	}
	spawn(0,10);



	$('.hexagon').hexify().each(function( index, hexagon ) {
	    // var xCoordStart = window.innerHeight * Math.random();
	    $( hexagon ).offset({top:-200, left:window.innerHeight * Math.random()})
	    var atTop=true;
	    $( this).animatesShapes(atTop);	    
	});

    

});