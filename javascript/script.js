/* global Stopwatch */

$( initialise );

var score = 0;
var nextSite;

function initialise() {
    //console.log(new Domain("imgur.com", new Calls().makeCall("GetTopics", "Item=imgur.com")));
    getRandomSite(function(out) {
        nextSite = out;
        createTarget();
        startTimer(30, document.querySelector('#timer'));
    });
    $(".ammo-selector").click(function() {
        console.log(this);
        $(".ammo-selected").removeClass("ammo-selected");
        $(this).addClass("ammo-selected");
        
    });
}


function createTarget() {
    var site = nextSite;
    getRandomSite(function(out) {
        nextSite = out;
    });

    var target = $("<div/>");
    target.attr("id", "target");
    target.text(site.name + " " + site.health);

    target.click(function() {
        if (site.health <= 0) {
            $(this).stop();
            $(this).remove();
            score++;
            setScore(score);
            createTarget();
        } else {
            setScore(score);
            $(this).stop();
            var topic = $(".ammo-selected")[0].innerHTML.trim();
            site.health -= site.topics[topic];
            $(this).text(site.name + " " + site.health);
            $(this).effect("shake");
        }
    });
    $("#target-area").append(target);
    
}

function setScore(score){
    $("#score").text("Score: " + score);
}

function startTimer(duration, display) {
    var start = Date.now(),
            diff,
            minutes,
            seconds,
            interval;
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
            clearInterval(interval);
        }
    }
    // we don't want to wait a full second before the timer starts
    timer();
    interval = setInterval(timer, 100);
}