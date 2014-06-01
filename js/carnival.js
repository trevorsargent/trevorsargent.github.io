function println(line) {
    $("<p>" + line + "</p>").insertBefore("#placeholder");
}

function line() {
    $("<p></br></p>").insertBefore("#placeholder");
}

function addArticle(string) {
    var article;
    if (string.charAt(0) == 'a' || string.charAt(0) == 'e' || string.charAt(0) == 'i' || string.charAt(0) == 'o' || string.charAt(0) == 'u') {
        article = "an ";
    } else {
        article = "a "
    }
    return article + " " + string;
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
    println('there are lots of fun things here');
    println('enjoy yourself. we demend it.');
    line();
}

function Person() {
    this.name = "";
    this.age = 0;
    this.height = 0;
    this.money = 0;
    this.currentLocation = {};
    this.pockets = ["dollar", "quarter", "phone", "flashlight", "wrench", "envelope"];
    this.paid = false;

    this.walkTo = function valkTo(Place) {
        this.currentLocation.beenHere = true;
        this.currentLocation = Place;
    }

    this.take = function take(string) {
        var itemIndex = this.currentLocation.objects.indexOf(string);
        if (itemIndex > -1) {
            var thing = this.currentLocation.objects.splice(itemIndex, 1);
            this.pockets.push(string);
            return true;
        } else {
            return false;
        }
    }

    this.drop = function drop(string) {
        var itemIndex = this.pockets.indexOf(string);
        if (itemIndex > -1) {
            var thing = this.pockets.splice(itemIndex, 1);
            this.currentLocation.objects.push(string);
            return true;
        } else {
            return false;
        }
    }

    this.emptyPockets = function emptyPockets() {
        var toReturn = "your pockets contain: </br>";
        for (var i = 0; i < this.pockets.length; i++) {
            toReturn += addArticle(this.pockets[i]) + "</br>";
        }
        return toReturn;
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
    this.beenHere = false;
    this.isRide = false;

    this.description = function() {
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
        if (!this.beenHere && this.newText != "") {
            toReturn += "</br></br>" + this.newText + ".";
        }
        return toReturn;
    }

    this.listObjects = function listObjects() {
        var toReturn = "";
        if (this.objects.length > 0) {
            toReturn += "you see: "
            for (var i = 0; i < this.objects.length; i++) {

                toReturn += ("</br> " + addArticle(this.objects[i]));
            }
        } else {
            toReturn = "there's nothing here"
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
    ticketEntrance.newText = "god this place is run down...";
    //items
    ticketEntrance.objects.push("ticket");
    ticketEntrance.objects.push("attendant");



    //mainSquare
    mainSquare.name = "main square";
    mainSquare.ahead = ferrisWheel;
    mainSquare.left = foodCarts;
    mainSquare.right = arcade;
    mainSquare.behind = ticketEntrance;

    //ferrisWheel
    ferrisWheel.name = "ferris wheel";
    ferrisWheel.behind = mainSquare;
    ferrisWheel.isRide = true;

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

    player = new Person();
    player.currentLocation = parkingLot;
    player.currentLocation.beenHere = true;

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
            println('- surroundings');
            // println('(returns a description of your surroundings)');
            println('- pockets');
            // println('(returns a list of everything you have in your pockets)');
            println('- items');
            println('- walk to [place]');
            println('- drop [item]');
            println('- take [item]');

        } else if (input.indexOf("look around") > -1) {
            println(player.currentLocation.description());
        } else if (input.indexOf("walk to") > -1) {
            // input = input.replace("walk to", "").trim().input.replace("the", "").trim();
            input = input.replace("walk to", "");
            input = input.trim();
            input = input.replace("the", "");
            input = input.trim();
            var walking = false;
            if(player.currentLocation == ticketEntrance && input.indexOf("main square") > -1 && !player.paid){
                println("it looks like you have to have a ticket to enter");
            }else{
                if (player.currentLocation.name == input) {
                    println("you are already at the " + input);
                } else if (player.currentLocation.left.name == input) {
                    player.walkTo(player.currentLocation.left);
                    walking = true;
                } else if (player.currentLocation.right.name == input) {
                    player.walkTo(player.currentLocation.right);
                    walking = true;
                } else if (player.currentLocation.ahead.name == input) {
                    player.walkTo(player.currentLocation.ahead);
                    walking = true;
                } else if (player.currentLocation.behind.name == input) {
                    player.walkTo(player.currentLocation.behind);
                    walking = true;
                } else {
                    println("that's not a place you can walk to from here");
                }
            }

            if (walking) {
                println("walking to the " + player.currentLocation.name + "...");
                line();
                println(player.currentLocation.description());
            }
        } else if (input.indexOf("take") > -1) {
            input = input.replace("take", "");
            input = input.trim();
            input = input.replace("the", "");
            input = input.trim();
            if(player.currentLocation == ticketEntrance && input.indexOf("ticket") > -1 && !player.paid){
                println("you have to pay for your ticket");
            } 
            else if (!player.take(input)) {
                println("there isn't " + addArticle(input) + " so you can't take it.")
            }
        } else if (input.indexOf("drop") > -1) {
            input = input.replace("drop", "");
            input = input.trim();
            input = input.replace("the", "");
            input = input.trim();
            if(player.currentLocation == ticketEntrance && input.indexOf("dollar") > -1){
                player.paid = true;
                println('the attendat says, "thank you - here is your ticket..." ');
            }
            if (!player.drop(input)) {
                println("you dont have " + addArticle(input) + " so you can't drop one.")
            }
        } else if (input.indexOf("pockets") > -1) {

            println(player.emptyPockets());
        } else if (input.indexOf("items") > -1) {
            // println("HI");
            println(player.currentLocation.listObjects());
        } else if (true) {

        } else if (true) {

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
