$( document ).ready(function() {
    console.log( "ready!" );
    // $( "#header" ).css( "height", window.innerHeight);

    var isMobile = true;

	if ( window.innerWidth > 600 ) {
		isMobile = false;
	} 

	console.log(isMobile)

	if ( isMobile == false ) {

		
		scrollyDividers();
		var index=0,count=0, word, words = ['innovate','learn','build','dream','code','create']
		untype()

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

	} else {

		$('.desktop-only').css('display', 'none');

	}


    function scrollyDividers() {
		$(window).scroll( function() {
			var top = $(this).scrollTop();
			//if (top > lastScrollTop) {
				$('section').each( function() {
					var height = $(this).height();
					var sectionOffset = $(this).offset();
					if (top + window.innerHeight > sectionOffset.top) {
						setWidth=100*(top + window.innerHeight - sectionOffset.top)/height;
						if (setWidth > 100 ) {
							setWidth = 100;
						}
					
						$('.scrolly-divider', this).width(setWidth -5 +'%');
						$('.tinyhexagon', this).css({
								'margin-left': setWidth - 5 + '%',
						})
						$('.tinyhexagon span', this).css('transform', 'rotate(' + setWidth * 20 + 'deg)')
					}

				})
		});
	}



	// all used for styling
	$('.question').hover( function() {
		$('p span', this).addClass('yellow');
	}, function() {
		$('p span', this).removeClass('yellow')
	})
	.click( function() {
		$(this).siblings().slideToggle('medium', 'linear');
		$('p span',this).toggleClass('rotated');
	});

	$('.question p').prepend('<span class="glyphicon glyphicon-triangle-right"></span>  ');

	
	

	function type(word) {
		setTimeout(function() {
			if (word.length > 0) {
				$('#changing-text').append( word.shift() )
				type(word);
			} else if (word.length==0){
				pause();
			}
			
		}, 200)
	}
	function untype() {
		setTimeout(function() {
			word=$('#changing-text').html().split('');
			word.pop()
			if (word.length > 0) {
				$('#changing-text').empty().append( word )
				untype()
			} else if (word.length==0){
				$('#changing-text').empty();
				nextWord();
			}
			
		}, 100)
	}
	function pause() {
		setTimeout(function() {
			untype();
			
		}, 2000)
	}
	function nextWord() { 	
		index = count%6;
		count++
		word=words[index].split('');
		type(word);
	}

})

