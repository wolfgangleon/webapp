$(document).ready(function(){

	//Hover over nav elements
	$('#interactive .navbar li').hover(function() {
		$(this).toggleClass('active');
	});

	//Click on CrossRoad title to reload the page
	$('#interactive .navbar-brand').on('click', function() {
		location.reload();
	})

	//Show nav bar elements info
	$('nav #link-what').on('click', function(){
		$('#what').fadeIn();
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

	//Submit button Search
	$('#get-location').submit(function() {

		$('#search-result').html('');

		$('#results').fadeIn();
		
		$('html,body').animate({scrollTop: $('#results').offset().top},800 );

		var activity = $('#selected-activity').html(),
			location = $('#location').val();

			console.log('selected-activity:' + activity)
			console.log('location:'+ location)

		var params = {	
			api_key:'3fb0455c6af396a7fcfff852600cb619',
			limit:25,
			q:{
				activities_activity_type_name_cont:activity, 
				city_cont:location
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