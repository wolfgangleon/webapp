$(document).ready(function(){

	$('#interactive .navbar li').hover(function() {
		$(this).toggleClass('active');
	});

	$(window).scroll(function(){
	   if( $(document).scrollTop() > 0 ) {
	      $('#backToTop').show();
	   } else {
	      $('#backToTop').hide();
	   }
	});

	$('#interactive .navbar-brand').on('click', function() {
		location.reload();
	})

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

		$('#results').fadeIn();
		
		$('html,body').animate({scrollTop: $('#results').offset().top},800 );

		var activity = $('#selected-activity').html(),

			location = $('#location').val();

			console.log('selected-activity:' + activity)
			console.log('location:'+ location)

		var params = {	
			api_key:'3fb0455c6af396a7fcfff852600cb619',
			limit:10,
			//activities_activity_type_name_eq: activity,
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
				});

			});

	});


});