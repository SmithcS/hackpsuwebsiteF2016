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

	$.fn.animatesShapes = function(toggle,size) {

		// duration of animation may be altered depending on effect to achieve
		var time = 2500 * size + Math.floor(1500 * size * Math.random());


		//reset opacity
    	$( this ).css("opacity", 1 / size);

    	// toggle variable decides whether it's going up or down
		if ( toggle ) {
			var yCoordEnd = "+=120%";
		} else {
			yCoordEnd = "-=120%";
		}		

		// simple animation function, sets new coordinates, toggles, and recurses
		$( this ).animate({
			opacity: (1 / size) - 0.2 * size,
			left: window.innerWidth * Math.random() - size * 52,
			top: yCoordEnd
		},time, "linear", function(){
			toggle = !toggle;
			$(this).animatesShapes(toggle, size);
		});

		return this
	}	

	var numberOfHexagons = 0;
	
	//spawns shapes, shocker
	(function spawn() {
		var atTop=true;
		// timeout function for creating a hexagon on an interval
	    setTimeout(function() {
	    	var size = numberOfHexagons % 3 + 1;
	        $( 'body' ).prepend($('<div>')
	        	.addClass('hexagon')
	        	.hexify(size)
	        	.css('z-index', -1 * size)
	        	.offset({top:-50, left:window.innerWidth * Math.random() - size * 52})
	        	.animatesShapes(atTop, size));

	        numberOfHexagons++;
	        if (numberOfHexagons < Math.floor(window.innerWidth/40)) {
	            spawn();
	        }

	    }, 1000);

	})(); 