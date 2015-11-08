/* global Stopwatch */

$( initialise );

var score = 0;
var nextSite;

function initialise() {
    //new Calls().makeCall("GetTopics", "Item=youtube.com", function(out) {
    //    console.log(new Domain("youtube.com",out));
    //});
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

var canClick = true;

function createTarget() {
    var site = nextSite;
    getRandomSite(function(out) {
        nextSite = out;
    });

    var target = $("<div/>");
    target.attr("id", "target");
    target.text(site.name + " " + site.health);

    target.click(function() {
        if (!canClick) return;
        setScore(score);
        var topic = $(".ammo-selected").text().trim();
        var index = site.topicOrder.indexOf(topic);
        if (index !== -1) {
            site.health -= (500 / (index + 1));
            $(this).text(site.name + " " + site.health);
            $(this).effect("shake");
            if (site.health <= 0) {
                var best = $("#" + site.topicOrder[0].toLowerCase());
                best.addClass("best-topic");
            }
        }
        canClick = false;
        var clicked = this;
        setTimeout(function() {
            if (site.health <= 0) {
                clicked.remove();
                score++;
                setScore(score);
                createTarget();
                $(".best-topic").removeClass("best-topic");
            }
            canClick = true;
        }, 750);
    });
    $("#target-area").append(target);
    
}

var scorey = 0;

function setScore(score){
    $("#score").text("Score: " + score);
    scorey = score;
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
            alert("Time's up! Your score is " + scorey);
            window.location.replace("index.html");
        }
    }
    // we don't want to wait a full second before the timer starts
    timer();
    interval = setInterval(timer, 100);
}