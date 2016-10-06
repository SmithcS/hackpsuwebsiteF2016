	$( document ).ready(function() {
    console.log( "ready!" );
    // $( "#header" ).css( "height", window.innerHeight);

    var imdobile = true;

	if ( window.innerWidth > 600 ) {
		imdobile = false;
	} 

	console.log(imdobile)

	if ( imdobile == false ) {

		
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
						setWidth=100*(top + window.innerHeight - sectionOffset.top)/(height);
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

	var sponsors = Info["sponsors"];
	// console.log(sponsors);


//TODO: Change this to simply retrieving the logos and show three logos in a row
		//Then popup modal with the sponsor's info when clicked
	for (var i = 0; i < sponsors.length; i++) {
		var sponsor1 = sponsors[i], sponsor2 = sponsors[++i]; sponsor3 = sponsors[++i];
		var createHTML = function (sponsor) {
			return '<div class="sponsor-list-image col-md-4"><a href="#sponsor-modal" class="data-modal"><img style="max-width: 350px;" id="'
	   				+ sponsor.name + '" src="'
	   				+ sponsor.logo
	   				+ '"></a></div>'
		}

		try{
	   	var sponsorHTML =
	   	'<div class="row">' + createHTML(sponsor1) + createHTML(sponsor2) + createHTML(sponsor3) + '</div>';
	   } catch (err) {
	   	if (sponsor2 == null) {
	   		sponsorHTML = '<div class="row">' + createHTML(sponsor1) + '</div>'
	   	}
	   	else if (sponsor3 == null) {
	   		sponsorHTML = '<div class="row">' + createHTML(sponsor1) + createHTML(sponsor2) + '</div>'
	   	}
	   }  	
	   	$('#sponsor-list').append(sponsorHTML);
	   }

	$('.data-modal').on("click", "img, a", function(event) {
		var sponsor = sponsors.find(function(element) {
			return element.name === event.target.id
		})
		$('#sponsor-modal').jmodal({
			showClose: false,
			fadeDuration: 250,
			fadeDelay: 0.5
		})
		$('#sponsor-modal h1').text(sponsor.name)
		$('#sponsor-modal p').text(sponsor.description)
		$('#sponsor-modal img').attr("src", sponsor.logo)
		return false;
	})

	// var workshops = Info["workshops"];
	// for (var key in workshops) {
	// 	var workshop = workshops[key];

	//    	var workshopHTML =
	//    	'<tr><td>'
	//    	+ workshop.time
	//    	+'</td><td>'
	//    	+ workshop.name
	//    	+ '</td><td>'
	//    	+ workshop.instructor
	//    	+ '</td><td>'
	//    	+ workshop.location
	//    	+ '</td></tr>';
		   	
	//    	$('#workshop-block').append(workshopHTML);
	// }
	// var prizes = Info["prizes"];
	// for (var key in prizes) {
	// 	var prize = prizes[key];

	//    	var workshopHTML =
	//    	'<tr><td><span style="font-weight:800">'
	//    	+ prize.name
	//    	+ '</span><br><span class="lightBlue">'
	//    	+ prize.sponsor
	//    	+ '</span></td><td>'
	//    	+ prize.value
	//    	+ '</td><td>'
	//    	+ prize.requirements
	//    	+ '</td><td>'
	//    	+ prize.judging
	//    	+ '</td></tr>';
		   	
	//    	$('#prize-list').append(workshopHTML);

	// }
	// var judges = Info["judges"];
	// for (var key in judges) {
	// 		var judge = judges[key];
	// 	   	var judgeHTML =
	// 	   	'<div class="row"><div class="sponsor-list-image col-md-4"><div style="background-image:url('
	// 	   	+ judge.image
	// 	   	+ ')"></div></div><div class="col-md-8"><h5>' 
	// 	   	+ judge.name 
	// 	   	+ '</h5>'
	// 	   	+ judge.tagline
	// 	   	+ '<p class="judge-description">'
	// 	   	+ judge.description
	// 	   	+ '</p></div></div>';
			   	
	// 	   	$('#judges-list').append(judgeHTML);
	// }
	// var hardware = Info["hardware"];
	// for (var key in hardware) {
	// 		var item = hardware[key];
	// 	   	var itemHTML =
	// 	   	'<tr><td>'
	// 	   	+ item.quantity 
	// 	   	+ '</td><td>'
	// 	   	+ item.type
	// 	   	+ '</td></tr>';
			   	
	// 	if ( key < 7) {
	// 	   	$('#hardware-list-1').append(itemHTML);
	// 	} else {
	// 		$('#hardware-list-2').append(itemHTML);
	// 	}
	// };
	// var rubric = Info["rubric"];
	// for ( var key in rubric ) {
	// 		var rubricArea = rubric[key]; var questionsHTML = '';
	// 		for ( var i = 0; i < rubricArea.questions.length; i++ ) {
	// 			questionsHTML += '<li>' + rubricArea.questions[i] + '</li>';
	// 		}
			
		   
	// 	   	var rubricHTML =
	// 	   	'<div><h2>'
	// 	   	+ rubricArea.criteria
	// 	   	+ '</h2><ul>'
	// 	   	+ questionsHTML
	// 	   	+ '</ul></div>';
			   	
	// 	$('#' + rubricArea.type + '-rubric').append(rubricHTML)
	// };

})

