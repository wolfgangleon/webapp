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

	$('#select-activities .btn').on('click', function(){

		var activity = $(this).html();

		$('#select-activities').hide();
		$('#type-location').fadeIn();
		$('#selected-activity').html( activity )
		$('#location').focus();
	})

	$('#get-location').submit(function() {

		$('#results').fadeIn();
		
		$('html,body').animate({scrollTop: $('#results').offset().top},800 );

	})


});