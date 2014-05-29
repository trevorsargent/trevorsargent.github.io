$(document).ready(function() {

	$("form").submit(function() {
		var input = $("#command_line").val();
		
		$('<p>'+input+'</p>').insertBefore('#placeholder');
		
		$("#console").scrollTop($("#console")[0].scrollHeight);
		
		$("#command_line").val("");
	});
});