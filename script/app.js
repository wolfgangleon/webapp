$(document).ready(function(){

	//Set google maps
	var mapOptions = {
	    center: new google.maps.LatLng(38.4694497,-98.6489868),
	    zoom: 4,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	},

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	//Hover over nav elements
	$('#interactive .navbar li').hover(function() {
		$(this).toggleClass('active');
	});

	//Click on New search title to reload the page
	$('#interactive .navbar-brand').on('click', function() {
		location.reload();
	})

	//Show nav bar element What info
	$('nav #link-what').mouseenter(function(){
		$('#help').hide();
		$('#contact').hide()
		$('#what').show().fadeIn('slow');
	})

	//Show nav bar element contact info
	$('#link-contact').mouseenter(function(){
		$('#help').hide();
		$('#what').hide();
		$('#contact').show().fadeIn('slow');
	})

	//Show nav bar element help info
	$('#link-help').mouseenter(function(){
		$('#contact').hide();
		$('#what').hide();
		$('#help').show().fadeIn('slow');
	})

	//Hide panel info
	$('.panel').click(function(){
		$(this).hide();
	})

	$('.panel').mouseleave(function(){
		$(this).hide();
	})

	//Back to top button
	$(window).scroll(function(){
	   if( $(document).scrollTop() > 0 ) {
	      $('#backToTop').show();
	   } else {
	      $('#backToTop').hide();
	   }
	});

	
	//Button Selects an activtity
	$('#select-activities .btn').on('click', function(){

		var activity = $(this).html();

		$('#select-activities').hide();
		$('#type-location').fadeIn();
		$('#selected-activity').html( activity )
		$('#location').focus();
	})

	$('#location').on('click',function() {
		$(this).val('');
	})

	//Submit button Search
	$('#get-location').submit(function() {

		$('#search-result').html('');

		$('#results').fadeIn();
		
		$('html,body').animate({scrollTop: $('#results').offset().top},800 );

		var activity = $('#selected-activity').html(),
			
			statesLoc = [
            'alabama',
            'alaska',
            'arizona',
            'arkansas',
            'california',
            'colorado',
            'connecticut',
            'delaware',
            'district Of Columbia',
            'florida',
            'georgia',
            'hawaii',
            'idaho',
            'illinois',
            'indiana',
            'iowa',
            'kansas',
            'kentucky',
            'louisiana',
            'maine',
            'maryland',
            'massachusetts',
            'michigan',
            'minnesota',
            'mississippi',
            'missouri',
            'montana',
            'nebraska',
            'nevada',
            'new Hampshire',
            'new Jersey',
            'new Mexico',
            'new York',
            'north Carolina',
            'north Dakota',
            'ohio',
            'oklahoma',
            'oregon',
            'pennsylvania',
            'rhode Island',
            'south Carolina',
            'south Dakota',
            'tennessee',
            'texas',
            'utah',
            'vermont',
            'virginia',
            'washington',
            'west Virginia',
            'wisconsin',
            'wyoming',
        ];

        console.log(activity)

        if ( $.inArray( $('#location').val(), statesLoc ) > -1 ) {

        	var state = $('#location').val()

        }

        else {
        	var city = $('#location').val()
        };
       
		// Ajax trail API
		var params = {	
			api_key:'3fb0455c6af396a7fcfff852600cb619',
			limit:15,
			q:{
				activities_activity_type_name_cont:activity, 
				state_cont:state,
				city_cont:city
			} 
		  }
				
		var trailApi = $.ajax({

			url:'https://outdoor-data-api.herokuapp.com/api.json',
			data:params,
			dataType:'jsonp'}).done(function(result){
				console.log('results: ' , result.places )

			 	$.each(result.places, function(i,place) {
					console.log('place:', place)
					console.log('activities:' , place.activities[0].description )
				//	console.log('thumbnail: ', place.activitie )

					var item = $('.template #location-info').clone();

					//Set item title 
					var nameItem = item.find('#location-name');
						nameItem.text( place.name )

					// Set item description 
					var descripItem = item.find('#location-description');
						descripItem.text( place.activities[0].description)
						$('#location-description').find('script').remove();

					// Set item image 
					var thumbnail = item.find('#location-image');

						if ( place.activities[0].thumbnail == null ) {
							thumbnail.attr('src', 'http://www.bluehillsfarmshop.co.uk/images/blank.gif')
						} 
						else {
							thumbnail.attr('src', place.activities[0].thumbnail)
						};

					// Set item link
					var imgLink = item.find('#location-link');
						imgLink.attr('href', place.activities[0].url)

					// Set marker on map
					console.log('place.lat:', place.lat);
					console.log('place.lon:',place.lon)

					if ( place.lat || place.lon != 0 ) {

						var marker = new google.maps.Marker({
								position:  new google.maps.LatLng(place.lat,place.lon),
								});
						marker.setMap(map);
					}

					else {
						return null
					};

					// Append the item to DOM	
					$('#search-result').append(item)

				});				

			});

	});


});