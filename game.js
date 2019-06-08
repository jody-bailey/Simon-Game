// alert("this is working!");

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gameStarted = false;
var level = 0;

$(document).on("keypress", function() {
  if (gameStarted == false) {
    nextSequence();
    gameStarted = true;
    $("h1").text("Level " + level);
  }
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  console.log(randomChosenColor);

  playSound(randomChosenColor);
}

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(this.id);
  playSound(this.id);
  checkAnswer(userClickedPattern);
});

function playSound(name) {
  switch (name) {
    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;
    case "blue":
      sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;
    case "green":
      sound = new Audio("sounds/green.mp3");
      sound.play();
      break;
    case "yellow":
      sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;
    default:
      console.log("idk what happened.");
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  console.log(gamePattern);
  if (currentLevel[currentLevel.length - 1] == gamePattern[currentLevel.length - 1]) {
    console.log("success");
  } else {
    console.log("wrong");
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  if (currentLevel.length == gamePattern.length) {
    console.log("sequence finished");
    setTimeout(nextSequence, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
