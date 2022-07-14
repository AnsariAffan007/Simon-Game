// alert("Hello!");
let level = 0;

let buttonColors = ["red", "blue", "green", "yellow"];
let keyPress = 0;
let gameStarted = 0;

let gamePattern = [];
let userClickedPattern = [];

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    setTimeout(() => {
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }, 1000)
}

$(".btn").click(function () {
    if (gameStarted === 1) {
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).toggleClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).toggleClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    // console.log(gamePattern);
    // console.log(userClickedPattern);
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
        // console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // console.log("Wrong!");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").toggleClass("game-over");
        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(document).keydown(function (event) {
    gameStarted = 1;
    keyPress++;
    if (keyPress === 1) {
        nextSequence();
    }
});

function startOver() {
    keyPress = 0;
    level = 0;
    gameStarted = 0;
    gamePattern = [];
}