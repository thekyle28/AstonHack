/* global Stopwatch */
console.log(Calls());
var counter = 0;
var timer;
$( initialise );
var sites = [{name: "Google", health: 10},
         {name: "Facebook", health: 8},
         {name: "Imgur", health: 6},
         {name:"Reddit", health: 4}];

function initialise(){
    timer = new Stopwatch(document.getElementById("timer"));
    shuffle(sites);
    createTarget();
    timer.start();
}


function createTarget(){
    if (counter < sites.length){
        var site = sites[counter++];
        target = $("<div/>");
        target.attr("id", "target");
        target.text(site.name + " " + site.health);
        
        target.click(function(){
            console.log(site);
            if (site.health <= 0) {
                 setHeading("Score: " + counter);
                $(this).remove();
                createTarget();
            } else { 
                site.health--; 
                $(this).text(site.name + " " + site.health);
                setHeading("Score: " + counter);
            }
        });
        
        $("#target-area").append(target);
    } else {
        timer.stop();
        $("body").append("<h1>YOU WIN</h1>");   
    }
    
}

function setHeading(text){
    $("#heading").text(text);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}