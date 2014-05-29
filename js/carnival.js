function cout(line){
	$("<p>"+line+"<p>").insertBefore("#placeholder");
}

function line(){
	$("<p></br></p>").insertBefore("#placeholder");
}

function welcome(){
	line(); line(); line(); line();line(); line(); line(); line();
	cout('-----------------------------')
	cout('| welcome to the carnival!! |');
	cout('-----------------------------')
	line();
}

function Person(){
	name;
	age;
	height;
	money;
	currentLocation;

	function walkTo (aPlace){
		this.currentLocation = aPlace.name;
	}

}

function Place(){
	name;
	surroundingsgo;
	objects;
	lookAroundText;

	function describe(){
		if(this.surroundings["left"] != )
	}
	
}

function setUp(){
	parkingLot = new Place();
	ticketEntrance = new Place();
	mainSquare = new Place();
	ferrisWheel = new Place();

	parkingLot.name = "the parking lot";
	parkingLot.surroundings
}

$(document).ready(function() {	


	welcome();

	setUp();

	player1 = new Person();


	$("form").submit(function() {
		var input = $("#command_line").val();
		cout(">> "+input);
		line();
		
		switch (input){
			case 'help':
				cout(' ');
				cout('helpful commands:');
				cout('- look around');
				cout('(returns a description of your surroundings)');
				cout('- pockets');
				cout('(returns a list of everything you have in your pockets)');
				cout('- walk to [place]');
				cout('- give [item] to [person]');
				cout('- take [item] from [person]');
			break;
		}
		
		$("html, body").animate({ scrollTop: $(document).height() }, 500);
		line();
		$("#command_line").val("");
	});
});