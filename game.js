var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");  //store the id of btn which is clicked
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrongaudio = new Audio("sounds/wrong.mp3");
        wrongaudio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over,Press Any Key To Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);


        startOver();

    }


}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);  //creating a random number btw 0and 3
    var randomChosenColour = buttonColours[randomNumber];  
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


function animatePress(currentColour) { 
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function playSound(name) {                             //for playing sound or audio
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}