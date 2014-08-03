$(document).ready(function(){
	$('#slider').hide();

	$('body').on('click', '#plus-glyph', function(){
		$('#slider').toggle('slide', {direction: 'left'}, 250);
		$('#expand-button').toggleClass('hot');
	});


});