

$(document).ready( function() {
	if ( $(window).width() < 650 ) {
		$('#floating').empty().height(50);
		$( '#timeline' ).empty();
	}


	$( window ).resize(function() {
		console.log($(window).width());
		$( '#timeline' ).empty().text('I\'m not responsive :(');
		if ( $(window).width() < 650 ) {
			$('#floating').empty().height(50);
		}
		
	});

	$('#expo-form').click( function() {
		$('iframe').toggle();
		$('.glyphicon-play').toggleClass('rotated');
	});

	$('.content > div').each( function() {
		sectionTitle = $('h1',this).text();
		$('#table-of-contents').append('<li><a href="#' 
			+ $(this).attr("id") + '">' 
			+ sectionTitle 
			+ '</a></li>')
	})


	var sponsors = Info["sponsors"];
	console.log(sponsors);


	

	var testHTML = '';

	for (var key in sponsors) {
		var sponsor = sponsors[key];
	   	var sponsorHTML =
	   	'<div class="row"><div class="sponsor-list-image col-md-4"><img src="'
	   	+ sponsor.logo
	   	+ '"></div><div class="col-md-8"><h5>' 
	   	+ sponsor.name 
	   	+ '</h5><p>'
	   	+ sponsor.description
	   	+ '</p></div></div>';
		   	
	   	$('#sponsor-list').append(sponsorHTML);
	}

	var workshops = Info["workshops"];
	for (var key in workshops) {
		var workshop = workshops[key];

	   	var workshopHTML =
	   	'<tr><td>'
	   	+ workshop.time
	   	+'</td><td>'
	   	+ workshop.name
	   	+ '</td><td>'
	   	+ workshop.instructor
	   	+ '</td><td>'
	   	+ workshop.location
	   	+ '</td></tr>';
		   	
	   	$('#workshop-block').append(workshopHTML);
	}
	var prizes = Info["prizes"];
	for (var key in prizes) {
		var prize = prizes[key];

	   	var workshopHTML =
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
		   	
	   	$('#prize-list').append(workshopHTML);

	}
	var judges = Info["judges"];
	for (var key in judges) {
			var judge = judges[key];
		   	var judgeHTML =
		   	'<div class="row"><div class="sponsor-list-image col-md-4"><div style="background-image:url('
		   	+ judge.image
		   	+ ')"></div></div><div class="col-md-8"><h5>' 
		   	+ judge.name 
		   	+ '</h5>'
		   	+ judge.tagline
		   	+ '<p class="judge-description">'
		   	+ judge.description
		   	+ '</p></div></div>';
			   	
		   	$('#judges-list').append(judgeHTML);
	}
	var hardware = Info["hardware"];
	for (var key in hardware) {
			var item = hardware[key];
		   	var itemHTML =
		   	'<tr><td>'
		   	+ item.quantity 
		   	+ '</td><td>'
		   	+ item.type
		   	+ '</td></tr>';
			   	
		if ( key < 7) {
		   	$('#hardware-list-1').append(itemHTML);
		} else {
			$('#hardware-list-2').append(itemHTML);
		}
	};
	var rubric = Info["rubric"];
	for ( var key in rubric ) {
			var rubricArea = rubric[key]; var questionsHTML = '';
			for ( var i = 0; i < rubricArea.questions.length; i++ ) {
				questionsHTML += '<li>' + rubricArea.questions[i] + '</li>';
			}
			
		   
		   	var rubricHTML =
		   	'<div><h2>'
		   	+ rubricArea.criteria
		   	+ '</h2><ul>'
		   	+ questionsHTML
		   	+ '</ul></div>';
			   	
		$('#' + rubricArea.type + '-rubric').append(rubricHTML)
	};


	currentTime = (new Date().getTime())/1000;
	startTime = 1460217600;
	endTime = 1460307600;

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

	eventTimes = [0,2,3,5,9,14,22.5,26,27,27.5,28.5,30];
	for (var i=0; i<12; i++) {
		console.log($('#timeline-bar').width());
		distance = (eventTimes[i]/30 * $('#timeline-bar').width()) - 15;
		if (i < 6 ) {
			whichDay = '#day1';
		} else {
			whichDay = '#day2';
		}
		
		$('#timeline').append($('<div>')
			.addClass('timeline-circle')
			.css( {
				'left' : eventTimes[i]/30 * $('#timeline-bar').width() - 15, 
				'top' : (-30 * i)-18 
			})
			.attr("data-whichDay",whichDay)
			.attr("data-tableRow", i % 6 + 1)
		);
	};

	$('.timeline-circle').each( function() {
		$(this).hover( function() {
			selectorString = $(this).attr('data-whichDay') + ' tr:nth-child(' +  $(this).attr('data-tableRow') + ')';
			$(selectorString).toggleClass('selected-event');
		})
	})

	$('#easter-egg div').click( function() {
		$('#an-image').css('display','block');
		
	})


});
