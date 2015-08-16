$(document).ready(function(){

	//Set google maps
	var mapOptions = {
	    center: new google.maps.LatLng(38.4694497,-98.6489868),
	    zoom: 5,
	    streetViewControl: false,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    zoomControlOptions: {
	      style: google.maps.ZoomControlStyle.SMALL
	    }
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	// states 
	var statesLoc = [
            'alabama',
            'alaska',
            'arizona',
            'arkansas',
            'california',
            'colorado',
            'connecticut',
            'delaware',
            'district of columbia',
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
            'new hampshire',
            'new jersey',
            'new mexico',
            'new york',
            'north carolina',
            'north dakota',
            'ohio',
            'oklahoma',
            'oregon',
            'pennsylvania',
            'rhode island',
            'south carolina',
            'south dakota',
            'tennessee',
            'texas',
            'utah',
            'vermont',
            'virginia',
            'washington',
            'west virginia',
            'wisconsin',
            'wyoming',
        ];

	//Hover over nav elements
	$('#interactive .navbar li').hover(function() {
		$(this).toggleClass('active');
	});

	//Click on New search title to reload the page
	$('#appTitle').on('click', function() {
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
	});

	$('.panel').mouseleave(function(){
		$(this).hide();
	});

	
	//Button Selects an activtity
	$('.activity').on('click', function(){

		var activity = $(this).html();

		$('#actDrop').hide();
		$('#selected-activity').fadeIn().html( activity )
		$('#location').removeAttr('disabled')
		$('#submit-search').removeAttr('disabled')
	})

	$('#location').on('click',function() {
		$(this).val('');
	})

	// setInfo of the item
	var setInfo = function (place){

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
			imgLink.attr('href', place.activities[0].url);

		// Set marker on map
		if ( place.lat || place.lon != 0 ) { //checks for lat and long errors

			var markers = [];

			var marker = new google.maps.Marker({
					position:  new google.maps.LatLng(place.lat,place.lon),
					});

			marker.setMap(map);
			map.setCenter({
				lat:place.lat,
				lng:place.lon,
			});
			map.setZoom(6);
			markers.push(marker)		
		}

		var infoWindowOptions = {
						    content: place.name	    		 
						};

		var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

			google.maps.event.addListener(marker,'click',function(e){

				infoWindow.open(map, marker),
				map.setCenter({
				lat:place.lat,
				lng:place.lon,
				}),
				$('#search-result').show(),
				$('#search-result').html(''),
				$('#search-result').append(item), // append item to DOM
				map.panBy(-300,0)
			  
			});

		return item;
	};

	//Submit button Search
	$('#get-location').submit(function(e) {
		e.preventDefault();

		$('#search-result').hide();

		$('#results').fadeIn();

		var activity = $('#selected-activity').html();
			     
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

				if ( result.places.length != 0 ) {

				 	$.each(result.places, function(i,place) {
						var itemInfo = setInfo(place)
					});				
			 	}
			 	else {
			 		alert('Try another location or check typing errors');
			 	}

			});

	});


});