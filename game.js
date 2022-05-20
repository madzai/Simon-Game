var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function() {
  if(!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

function nextSequence() {
  // Increase level by 1
  level++;
  $("#level-title").text("Level " + level);
  // random number 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // flash light
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // play sound
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  // check if user's recent answer is correct
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // if user has finished all inputs, go to next level
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {  nextSequence(); }, 1000);
      userClickedPattern = [];
    }
  } else {
    // Game over
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {  $("body").removeClass("game-over"); }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  // button turns grey after pressed
  $("." + currentColour).addClass("pressed");
  // button returns to normal colour after 0.1 second
  // Method 1
  setTimeout(() => {  $("." + currentColour).removeClass("pressed"); }, 100);
  // Method 2
  // setTimeout(function() {
  //   $("." + currentColour).removeClass("pressed");
  // }, 100);
}
