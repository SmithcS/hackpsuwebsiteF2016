	$( document ).ready(function() {
    console.log( "ready!" );
    // $( "#header" ).css( "height", window.innerHeight);

    var imdobile = true;

	if ( window.innerWidth > 600 ) {
		imdobile = false;
	}

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

	//Set map url
	if(imdobile) {
		$('#map-container iframe').removeClass('iframe-map');
		$('#map-container').addClass('embed-responsive');
		$('#map-container').addClass('embed-responsive-4by3');
		$('#map-container iframe').addClass('embed-responsive-item');
		$('#map-container').css("padding-bottom", "125%");
	}
	$('#venue-container iframe').attr("src", "http://www.map.psu.edu/?#0023001")



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

	$("#maps-icon").hover(function() {
		$(this).animate({
			height: '+=5',
			width: '+=5'
		}, "fast")
	}, function() {
		$(this).animate({
			height: '-=5',
			width: '-=5'
		}, "fast")
	})

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
	for (var i = 2; i < sponsors.length; i++) {
		var sponsor1 = sponsors[i], sponsor2 = sponsors[++i]; sponsor3 = sponsors[++i];

		var createSponsorHTML = function (sponsor) {
			return '<div class="col-md-4 sponsor-med"><a href="#sponsor-modal" class="data-modal"><img class="img-responsive" id="'
	   				+ sponsor.name + '" src="'
	   				+ sponsor.logo
	   				+ '"></a></div>'
		}

		// Second function for HTML in 'In coordination with' section
		var createPartnerHTML = function (partner) {
			return '<div class="col-md-12 sponsor-lg"><a href="#sponsor-modal" class="data-modal"><img class="img-responsive" id="'
	   				+ partner.name + '" src="'
	   				+ partner.logo
	   				+ '"></a></div>'
		}

		// Only run once to populate partner-list
		if (i == 4) {
			var partner1 = sponsors[0];
			var partner2 = sponsors[1];
			var partnerHTML = '<div class="row">' + createPartnerHTML(partner1) + createPartnerHTML(partner2) + '</div>';
			$('#partner-list').append(partnerHTML);
		}

		try {
	   		var sponsorHTML = '<div class="row">' + createSponsorHTML(sponsor1) + createSponsorHTML(sponsor2) + createSponsorHTML(sponsor3) + '</div>';
	  	}
	  	catch (err) {
	   		if (sponsor2 == null) {
	   			sponsorHTML = '<div class="row">' + createSponsorHTML(sponsor1) + '</div>'
	   		}
	   		else if (sponsor3 == null) {
	   			sponsorHTML = '<div class="row">' + createSponsorHTML(sponsor1) + createSponsorHTML(sponsor2) + '</div>'
	   		}
	   	}

	   	$('#sponsor-list').append(sponsorHTML);
	   }

	//Setup sponsor modal
	$('.data-modal').on("click", "img, a", function(event) {
		var sponsor = sponsors.find(function(element) {
			return element.name === event.target.id
		})
		$('#sponsor-modal').jmodal({
			showClose: false,
			fadeDuration: 250,
			fadeDelay: 0.5
		})
		$('#sponsor-modal a').attr("href", sponsor.url)
		$('#sponsor-modal h1').text(sponsor.name)
		$('#sponsor-modal p').text(sponsor.description)
		$('#sponsor-modal img').attr("src", sponsor.logo)
		return false;
	});
	//Collapsible setup
	$('.collapse').on('hidden.bs.collapse', function() {
		var x = $(this).parent().find('h3').append('<span class="glyphicon glyphicon-collapse-down white"></span>')
		var x = $(this).parent().find('.glyphicon-collapse-up').remove()
	})
	$('.collapse').on('show.bs.collapse', function() {
		var x = $(this).parent().find('.glyphicon-collapse-down').remove()
		var x = $(this).parent().find('h3').append('<span class="glyphicon glyphicon-collapse-up white"></span>')
	})

	// $('.collapse').not('#schedule-container').collapse('hide');

	//timer
	currentTime = (new Date().getTime())/1000;
	startTime = 1478970000;
	endTime =   1479056400;

	if ( currentTime < startTime) {
		$('#countdown-text').text('until hackpsu!')
		getTimeRemaining(currentTime, startTime);
		isBeforeEvent = 1;
	} else if (currentTime < endTime ){
		$('#countdown-text').text('remains!')
		getTimeRemaining(currentTime, endTime);
		isBeforeEvent = 0;
	}
	function getTimeRemaining(currentTime, countdownTime) {
		timeTill = countdownTime - currentTime;
		$('#days div').text(Math.floor(timeTill / 86400));
		timeTill = timeTill % 86400;
		$('#hours div').text(Math.floor(timeTill / 3600));
		timeTill = timeTill % 3600;
		$('#minutes div').text(Math.floor(timeTill / 60));
		$('#seconds div').text(Math.floor(timeTill % 60));
		countDown(currentTime, countdownTime);
	}

	function countDown(currentTime, countdownTime) {
		setTimeout(function() {
			currentTime++;
			if ((countdownTime - currentTime) == 0) {
				if ( isBeforeEvent == 1) {
					$('#countdown-text').text('remains!')
					getTimeRemaining(currentTime, endTime);
				} else {
					$('.unit > div').each(function() {
						$(this).text('0');
					})
				}
			} else {
				getTimeRemaining(currentTime, countdownTime);
			}
		},1000);
	}

	//Schedule calendar
	var schedule = Info["schedule"];

	$('#calendar').fullCalendar({
		header : {
			center : '',
			right: ''
		},
		views : {
			agendaTwoDay : {
				type: 'agenda',
				duration : { days: 2 },
		 		buttonText : '2 day'
			}
		},
		defaultDate : '2016-11-12',
		eventSources:  {
			events: schedule,
		},
		eventColor : 'rgb(58,45,64)',
		eventBorderColor : 'white',
		slotEventOverlap: false,
		aspectRatio : '2',
		allDaySlot : false,
		defaultView : 'agendaTwoDay',
		eventClick : function (calEvent, jsEvent, view) {
			$('#event-modal').jmodal({
			showClose: false,
			fadeDuration: 250,
			fadeDelay: 0.5
		})
		$('#event-modal #event-header').text(calEvent.title)
		$('#event-description').html(calEvent.description)
		$('#event-location').text(calEvent.location);
		// $('#event-modal p').toggleClass('blocker')
		}
	});

	if (imdobile)
	$('	.fc-scroller.fc-time-grid-container').css('height', '450px');

	// $('')

  $("#nav-bar a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
		$('.navbar-toggle').click()
  });


	//SECTION Info

	if(imdobile) {
		//TODO: hide the arrows and collapse nav
		$('.glyphicon-menu-left, .glyphicon-menu-right').hide();
// 		$('#info-tabs').on('show.bs.collapse', function() {
//     $('.nav-tabs').addClass('nav-stacked');
// 		});
//
// //Unstack menu when not collapsed
// 		$('#info-tabs').on('hide.bs.collapse', function() {
//     $('.nav-tabs').removeClass('nav-stacked');
// 		});
	}
	$('#info-container .glyphicon-menu-left').click(function() {
		$('#info-tabs').animate( {
			scrollLeft: $('#info-tabs').scrollLeft() - 500
		}, 1000)
	})
	$('#info-container .glyphicon-menu-right').click(function() {
		$('#info-tabs').animate( {
			scrollLeft: $('#info-tabs').scrollLeft() + 500
		}, 1000)
	})

		var workshops = Info["workshops"];

	for (var key in workshops) {
		var workshop = workshops[key];

		//TODO: Fix the escaping of characters
	   	var workshopHTML =
	   	'<tr><td>'
	   	+ workshop.time
	   	+'</td><td>'
	   	+ workshop.name
	   	+ '</td><td>'
	   	+ workshop.instructor
	   	+ '</td><td>'
	   	+ workshop.description
	   	+ '</td><td>'
	   	+ workshop.location
	   	+ '</td></tr>';

	   	$('#workshop-block').append(workshopHTML);
	}
	var prizes = Info["prizes"];

	for (var key in prizes) {
		var prize = prizes[key];

	    	var prizeHTML =
	    	'<tr><td><span style="font-weight:800">'
	    	+ prize.name
	    	+ '</span><br><span class="lightBlue">'
	    	+ prize.sponsor
	    	+ '</span></td><td>'
	    	+ prize.value
	    	+ '</td><td>'
	    	+ prize.requirements
	    	+ '</td><td>'
	    	+ prize.judging
	    	+ '</td></tr>';

	    	$('#prize-list').append(prizeHTML);

	}
	var judges = Info["judges"];
	// for (var key in judges) {
	// 		var judge = judges[key];
	// 	   	var judgeHTML =
	// 	   	'<div class="row"><div class="judge-list-image col-md-4"><img src="'
	// 	   	+ judge.image
	// 	   	+ '"></div><div class="col-md-8"><h5>'
	// 	   	+ judge.name
	// 	   	+ '</h5>'
	// 	   	+ judge.tagline
	// 	   	+ '<p class="judge-description">'
	// 	   	+ judge.description
	// 	   	+ '</p></div></div>';

				for (var i = 0; i < judges.length; i++) {
					var judge1 = judges[i], judge2 = judges[++i]; judge3 = judges[++i];

					var createJudgeHTML = function (judge) {
						return '<div class="col-md-4"><div class="row judge-list-image"><img class="img-responsive" src="'
				   				+ judge.image
				   				+ '"></div><div class="row"><h5>'
									+ judge.name
									+'</h5></div><div class="row"><p class="judge-tagline text-center">'
									+	judge.tagline
									+ '</div><div class="row"><p class="judge-description text-center">'
									+ judge.description
									+ '</p></div></div>'
					}
					try {
				   		var judgesHTML = '<div class="row">' + createJudgeHTML(judge1) + createJudgeHTML(judge2) + createJudgeHTML(judge3) + '</div>';
				  	}
				  	catch (err) {
				   		if (sponsor2 == null) {
				   			sponsorHTML = '<div class="row">' + createJudgeHTML(judge1) + '</div>'
				   		}
				   		else if (sponsor3 == null) {
				   			sponsorHTML = '<div class="row">' + createJudgeHTML(judge1) + createJudgeHTML(judge2) + '</div>'
				   		}
				   	}

		   	$('#judges-list').append(judgesHTML);
			}
	var hardware = Info["hardware"];

	for (var key in hardware) {
			var item = hardware[key];
		   	var itemHTML =
		   	'<tr><td>'
		   	+ item.type
		   	+ '</td><td>'
		   	+ item.quantity
		   	+ '</td></tr>';
		   	$('#hardware-list').append(itemHTML);
	};
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
