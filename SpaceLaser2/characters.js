  let name=0;
class LevelOne { //moving items 

  constructor() {
    this.img = treats;
    this.x = random(100, 110);
    this.y = random(50, height - 50);
    this.xSpeed = random(1, 3);
    this.ySpeed = random(-1, 1);
      this.catchCount = 0
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.y < 60 || this.y > height - 60) {
      //if item is out of desired area or too far below the canvas, set new ySpeed
      this.ySpeed = random(-1, 1);
    }
    if (this.x > 700) {
      //if item has moved past the right edge of the canvas, set new random position
      this.x = random(-300, -200);
      this.y = random(120, 500);
    }
  }//end move
  
  
  display() {
    image(treats[loopl-1], this.x, this.y, 59, 46);
    
    //image(random(treats), this.randX,this.randY,59,46)
  }
  
  
}

class LevelOneBad { //moving items - bad ones

  constructor() {
    this.img = badTreats;
    this.x = random(100, 110);
    this.y = random(50, height - 50);
    this.xSpeed = random(1, 2);
    this.ySpeed = random(-1, 1);
    this.catchCount = 0
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.y < 60 || this.y > height - 60) {
      //if item is out of desired area or too far below the canvas, set new ySpeed
      this.ySpeed = random(-1, 1);
    }
    if (this.x > 700) {
      //if item has moved past the right edge of the canvas, set new random position
      this.x = random(-300, -200);
      this.y = random(120, 500);
    }
  }//end move
  
  
  display() {
    
    image(badTreats[loopl-1], this.x, this.y, 59, 46);
    
  }
}

function spaceCraft() {
  let posX = 400;
  let posY = height / 2
  push()
  let angle = Math.atan2(mouseY - posY, mouseX - posX);

  translate(posX, posY)
  rotate(angle)
  imageMode(CENTER)
  image(sc, 0, 0, 120, 120)
  pop()
}