$(document).ready(function(){

	//Hover over nav elements
	$('#interactive .navbar li').hover(function() {
		$(this).toggleClass('active');
	});

	//Click on New search title to reload the page
	$('#interactive .navbar-brand').on('click', function() {
		location.reload();
	})

	//Show nav bar elements info
	$('nav #link-what').mouseenter(function(){
		$('#app-info').show();
		$('#what').show().fadeIn('slow');
	})

	$('#what').mouseleave(function(){
		$('#app-info').hide();
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

        if ( $.inArray( $('#location').val(), statesLoc ) > -1 ) {

        	var state = $('#location').val()

        }

        else {
        	var city = $('#location').val()
        };
       
		// Ajax trail API
		var params = {	
			api_key:'3fb0455c6af396a7fcfff852600cb619',
			limit:10,
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

					$('#search-result').append(item)

				});

			});

	});


});