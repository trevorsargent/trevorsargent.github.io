function out(line){
	$("<p>"+line+"<p>").insertBefore("#placeholder");
}

$(document).ready(function() {	
	out('welcome to the carnival')
	$("form").submit(function() {
		var input = $("#command_line").val();
		
		switch (input){
			case 'help':
			out('helpful commands:');
			out('look around: returns a description of your surroundings');
		}
		
		$("#console").scrollTop($("#console")[0].scrollHeight);
		$("#command_line").val("");
	});
});