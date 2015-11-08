/* global Stopwatch */

var counter = 0
var score = 0;
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
    $(".ammo-selector").click(function(){
        console.log(this);
        $(".ammo-selected").removeClass("ammo-selected");
        $(this).addClass("ammo-selected");
        
    });
    console.log(new Domain("imgur.com", new Calls().makeCall("GetTopics", "Item=imgur.com")));
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
                $(this).stop();
                $(this).remove();
                score++
                setScore(score);
                createTarget();
            } else { 
                setScore(score);
                $(this).stop();
                site.health--; 
                $(this).text(site.name + " " + site.health);
                $(this).effect("shake");
                
            }
        });
        $("#target-area").append(target);
        
    } else {
        timer.stop();
        $(".container").append("<h1>YOU WIN</h1>");   
    }
    
}

function setScore(score){
    $("#score").text("Score: " + score);
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

        /**
         * Created by Kyle on 08/11/2015.
         */
        function startTimer(duration, display) {
            var start = Date.now(),
                    diff,
                    minutes,
                    seconds;
            function timer() {
                // get the number of seconds that have elapsed since
                // startTimer() was called
                diff = duration - (((Date.now() - start) / 1000) | 0);

                // does the same job as parseInt truncates the float
                minutes = (diff / 60) | 0;
                seconds = (diff % 60) | 0;

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                //place code in here, the code will run when the timer reaches zero.
                if (diff <= 0) {
                }
            };
            // we don't want to wait a full second before the timer starts
            timer();
            setInterval(timer, 100);
        }

        window.onload = function () {
            var fiveMinutes = 60 * 1,
                    display = document.querySelector('#timer');
            startTimer(fiveMinutes, display);
        };