$(document).ready(function(){

	$('#interactive .navbar li').hover(function() {
		$(this).toggleClass('active');
	});

	$('#select-activities .btn').on('click', function(){

		var activity = $(this).html();

		$('#select-activities').hide();
		$('#type-location').fadeIn();
		$('#selected-activity').html( activity )
		$('#location').focus();
	})

	$('#interactive .navbar-brand').on('click', function() {
		location.reload();
	})



});