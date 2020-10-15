let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress", function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  level++;
  $("#level-title").text("Level "+level);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
  $("#"+currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");
    $(document.body).addClass("game-over");
    setTimeout(function () {
      $(document.body).removeClass("game-over");

    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
