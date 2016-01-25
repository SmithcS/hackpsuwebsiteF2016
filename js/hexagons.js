function animations(){

	// array with white, dark blue, light blue and yellow
    selectColor = ['#FFFFFF','#2A202F','#0099FF','#e2cb59']


    // adds divs to create a hexagon
    $.fn.hexify = function(size) {
    	var randomColor = selectColor[Math.floor(Math.random()*4)];
    	$( this ).append($('<div>').addClass('hextop').css({
    		'border-bottom-color': randomColor,
    		'border-bottom-width': 15 * size,
    		'border-right-width': 26 * size,
    		'border-left-width': 26 * size
    	}));

    	$( this ).append($('<div>').addClass('hexmiddle').css({
    		'background-color': randomColor, 
    		'height': 30 * size,
    		'width': 52 * size
    	}));

    	$( this ).append($('<div>').addClass('hexbottom').css({
    		'border-top-color': randomColor,
    		'border-top-width': 15 * size,
    		'border-right-width': 26 * size,
    		'border-left-width': 26 * size
    	}));
    	return this;
	}

	// finds a random x coordinate that falls within the width of the window
	$.fn.getXCoord = function() {
		if ( $( this ).width() == 0 ) {
			var ErrorCatchWidth = 156;
		} else {
			ErrorCatchWidth = 0;
		}

		var xCoord=Math.random();

		if ( ( xCoord * window.innerWidth + $( this ).width() * 1.5 + ErrorCatchWidth ) > window.innerWidth ) {
			xCoord = window.innerWidth - $( this ).width() * 1.5 - ErrorCatchWidth * 1.5;
		} else {
			xCoord = xCoord * window.innerWidth;
		}

		return xCoord
	}

	$.fn.animatesShapes = function() {
    	size = $(this).prop('size');
		// duration of animation may be altered depending on effect to achieve
		time = (2500 + Math.floor(1500 * Math.random()) ) * size;
		currentPositionOfShape = $( this ).offset();

		//reset opacity
    	$( this ).css("opacity", 1 / size).offset({
    		top: currentPositionOfShape.top,
    		left: $( this ).getXCoord()
    	});

    	// toggle variable decides whether it's going up or down
		if ( currentPositionOfShape.top < 0.5 * window.innerHeight ) {
			var yCoordEnd = window.innerHeight;
		} else {
			yCoordEnd = -100;
		}

		// simple animation function, sets new coordinates, toggles, and recurses
		$( this ).animate({
			opacity: (1 / size) - 0.2 * size,
			left: $( this ).getXCoord(),
			top: yCoordEnd
		},time, "linear", function(){
			$( this ).animatesShapes();
		});

		return this
	}	

	function reanimate() {
		$('.hexagon').each( function( index ) {
			$(this).animatesShapes();
		});
	}

	//spawns shapes, shocker
	function spawn() {
		// timeout function for creating a hexagon on an interval
	    setTimeout(function() {
	    	var size = numberOfHexagons % 3 + 1;
	        $( 'body' ).prepend($('<div>')
	        	.addClass('hexagon')
	        	.prop('size', size)
	        	.hexify(size)
	        	.offset({
	        		left: 0,
	        		top: -150
	        	})
	        	.css( 'z-index', -1 * size )
	        	.animatesShapes());

	        numberOfHexagons++;
	        if (numberOfHexagons < Math.floor(window.innerWidth/40)) {
	            spawn();
	        }

	    }, 1000);

	};

	$( window ).resize(function() {

		$( '.hexagon' ).stop();

		$( '.hexagon' ).each( function( index ) {
			var currentPositionOfShape = $( this ).offset();

	 		if ( (currentPositionOfShape.left + $( this ).width() * 1.5) >= window.innerWidth ) {
				$( this ).remove();
			}

			$( "body" ).css( "width", window.innerWidth);

		});

		reanimate();
	});

	numberOfHexagons = 0;
	spawn(); 
}