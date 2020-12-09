
//let targetScore = []
//let targetScore = 0
let level = 1
let flag = 0
let loopl = 1
let loopn = 0


function targetPointUpdate() {
  noStroke()
  fill('white')
  textSize(27)
  //targetScore = [2,5,35,40,55,70,85,100,120,130,145,180]
  // for(var i = 0; i <100 ; i++){
  //   targetScore = targetScore + 2
  // } 

  //to show score. catchCount defined in sketch.js
  text('Score: ' + catchCount, 100, 50)
  //console.log('level:'+level);
  
//  l = level - 1
//  text('Level: ' + l, 100, 100);//for debugging purposes

  for (var j = 0; j < 7; j++) {
    if (catchCount === targetScore[j]) {
      level++;
      loopl++;
      targetScore[j] = 0;
      flag = 0;
      console.log('score:' + catchCount);
      console.log('target:' + targetScore);
      break;
    }
  }
  if (level % 8 == 0) {
    level += 1;
    loopl = 1

    loopn++;
    for (j = 0; j < 7; j++) {
      targetScore[j] = loopn * 35 + (j + 1) * 5;
    }
    console.log('targetScore:' + targetScore);
  }
}

function updateItems() {//assign score to each item

  //console.log(level);

}

function updateLives() {

  lives = [
  image(live, 540, 30, 40, 40),
  image(live, 580, 30, 40, 40),
  image(live, 620, 30, 40, 40)
  ] //draw three hearts

  if (catchBadCount == 3) {
      level = 0
      loopl = 1
      loopn = 0
    targetPointUpdate()
    restartButton.onRelease = function () {
      gameState = "L0"

      //console.log(gameState)
    }
    restartButton.onPress = function () {
      this.color = colors.violet;

    }
    restartButton.onHover = function () {
      this.color = colors.violet
    }
        restartButton.onOutside = function(){
    this.color = colors.yellow
}

  }
  if (catchBadCount == 1) {
    //lives3.blur;
    nolives = image(dead, 620, 30, 40, 40);
    
  }
  if (catchBadCount == 2) {
    //lives3.blur;
    nolives = image(dead, 620, 30, 40, 40);
    nolives = image(dead, 580, 30, 40, 40);
    
  }
  if (catchBadCount == 3) {
    nolives = image(dead, 540, 30, 40, 40);
    nolives = image(dead, 620, 30, 40, 40);
    nolives = image(dead, 580, 30, 40, 40);
    gameState = "L2"
    //level = 1
  }

}

function updatenewlive() {
  if (catchCount % 5 == 0 && flag == 0) {
    if (catchBadCount > 0)
      catchBadCount--;
    flag = 1
    refill.play()
  }
}


