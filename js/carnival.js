function println(line) {
    $("<p>" + line + "<p>").insertBefore("#placeholder");
}

function line() {
    $("<p></br></p>").insertBefore("#placeholder");
}

function welcome() {
    line();
    line();
    line();
    line();
    line();
    line();
    line();
    line();
    println('-----------------------------');
    println('| welcome to the carnival!! |');
    println('-----------------------------');
    line();
}

function Person() {
    this.name = "";
    this.age = 0;
    this.height = 0;
    this.money = 0;
    this.currentLocation = {};

    this.walkTo = function(Place) {
        this.currentLocation.beenHere = true;
        this.currentLocation = Place;
    }
}

function Place() {
    this.name = "";
    this.left = {};
    this.ahead = {};
    this.right = {};
    this.behind = {};
    this.objects = [];
    this.newText = "";
    beenHere = false;

    this.describe = function() {
        var toReturn = "you're standing in the " + this.name + ".";
        if (this.left.name != undefined) {
            toReturn += "</br>on your left is the " + this.left.name + ".";
        }
        if (this.right.name != undefined) {
            toReturn += "</br>on your right is the " + this.right.name + ".";
        }
        if (this.ahead.name != undefined) {
            toReturn += "</br>ahead of you is the " + this.ahead.name + ".";
        }
        if (this.behind.name != undefined) {
            toReturn += "</br>behind you is the " + this.behind.name + ".";
        }
        if (!this.beenHere) {
            toReturn += "</br></br>" + this.newText + ".";
        }
        return toReturn;
    }
}

function setUp() {
    parkingLot = new Place();
    ticketEntrance = new Place();
    mainSquare = new Place();
    ferrisWheel = new Place();
    foodCarts = new Place();
    arcade = new Place();

    //set up LOCATIONS
    //parking lot
    parkingLot.name = "parking lot";
    parkingLot.ahead = ticketEntrance;

    //ticketEntrance
    ticketEntrance.name = "ticket entrance";
    ticketEntrance.ahead = mainSquare;
    ticketEntrance.behind = parkingLot;
    ticketEntrance.newText = "it looks like you need to have a ticket to get in";

    //mainSquare
    mainSquare.name = "main square";
    mainSquare.ahead = ferrisWheel;
    mainSquare.left = foodCarts;
    mainSquare.right = arcade;
    mainSquare.behind = ticketEntrance;

    //ferrisWheel
    ferrisWheel.name = "ferris wheel";
    ferrisWheel.behind = mainSquare;

    //foodCarts
    foodCarts.name = "food carts"
    foodCarts.behind = mainSquare;

    //arcade
    arcade.name = "arcade";
    arcade.behind = mainSquare;
}

$(document).ready(function() {

    welcome();

    setUp();

    player1 = new Person();
    player1.currentLocation = parkingLot;

    var inputHistory = new Array();
    var numInputs = 0;
    var selectInput;

    $("form").submit(function() {
        var input = $('#command_line').val();
        inputHistory.push(input);
        numInputs += 1;
        selectInput = numInputs;
        println(">> " + input);
        line();

        //var inputArray = input.split(" "); 

        if (input.indexOf("help") > -1) {
            println('possible commands:');
            println('- look around');
            println('(returns a description of your surroundings)');
            println('- pockets');
            println('(returns a list of everything you have in your pockets)');
            println('- walk to [place]');
            println('- give [item] to [person]');
            println('- take [item] from [person]');
        } else if (input.indexOf("look around") > -1) {
            println(player1.currentLocation.describe());
        } else if (input.indexOf("walk to") > -1) {
            // input = input.replace("walk to", "").trim().input.replace("the", "").trim();
            input = input.replace("walk to", "");
            input = input.trim();
            input = input.replace("the", "");
            input = input.trim();
            var walking = false;
            if (player1.currentLocation.name == input) {
            	println("you are already at the " + input);
            } else if (player1.currentLocation.left.name == input) {
                player1.walkTo(player1.currentLocation.left);
                walking = true;
            } else if (player1.currentLocation.right.name == input) {
                player1.walkTo(player1.currentLocation.right);
                walking = true;
            } else if (player1.currentLocation.ahead.name == input) {
                player1.walkTo(player1.currentLocation.ahead);
                walking = true;
            } else if (player1.currentLocation.behind.name == input) {
                player1.walkTo(player1.currentLocation.behind);
                walking = true;
            }else{
            	println("that's not a place you can walk to from here");
            }

            if (walking) {
                println("walking to the " + player1.currentLocation.name + "...");
                line();
                println(player1.currentLocation.describe());
            }

        } else {
            println("command invalid");
        }


        $("html, body").animate({
            scrollTop: $(document).height()
        }, 500);
        line();
        $("#command_line").val("");
    });


    $(document).on("keyup", function(e) {
        var code = e.which;
        if (code == 38) {
            selectInput--;
            if (selectInput >= 0) {
                //alert(inputHistory[selectInput]);
                $('#command_line').val(inputHistory[selectInput]);
            }
        } else if (code == 40) {
            selectInput++;
            if (selectInput >= 0) {
                //alert(inputHistory[selectInput]);
                $('#command_line').val(inputHistory[selectInput]);
            }
        }
    });
});