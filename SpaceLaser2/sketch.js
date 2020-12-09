let floatings;
let numFloats = 5;
let floats = [];
let x = 0.0;
let y = 0.0;
let timer = 60
let ropef
let gameState = "L0"
let levelOne
let itemOneArr = [];
let catchCount = 0;
let catchBadCount = 0;
let lives = []
let targeScore = 10 //start with 10
let gamePage
let treats = []
let badTreats = []
let itemOneArrBad = [];
let colors
let record
// let randX
// let randY
// let treatsRand

function preload() {
  sc = loadImage('asset/sc.png')
  live = loadImage('asset/lives.png')
  dead = loadImage('asset/dead.png')

  item1 = loadImage('items/11.png')
  item2 = loadImage('items/22.png')
  item3 = loadImage('items/33.png')
  item4 = loadImage('items/44.png')
  item5 = loadImage('items/55.png')
  item6 = loadImage('items/66.png')
  item7 = loadImage('items/77.png')
  item8 = loadImage('items/88.png')
  item9 = loadImage('items/99.png')

  badItem1 = loadImage('badItems/1.png')
  badItem2 = loadImage('badItems/3.png')
  badItem3 = loadImage('badItems/4.png')
  badItem4 = loadImage('badItems/6.png')
  badItem5 = loadImage('badItems/7.png')
  badItem6 = loadImage('badItems/8.png')
  badItem7 = loadImage('badItems/9.png')

  startPage = loadImage('asset/startPage.jpg') //L0 show this
  gamePage = loadImage('asset/gamePage.png') //L1 show this
  endPage = loadImage('asset/endPage.jpg') //L2 show this

   // bgm = loadSound('zsound/BGM.m4a'); 
  
  //envato sound effects:
  ohno = loadSound('zsound/OHNO.mp3');
  yay = loadSound('zsound/yay.m4a'); 
  laser = loadSound('zsound/laser.m4a'); 
  refill = loadSound('zsound/refill.wav'); 
}



function setup() {
  createCanvas(700, 600);

  startButton = new Clickable();
  restartButton = new Clickable();


   randX = random(50,450)
   randY = random(50,550)
  
  

  treats = [item1, item2, item3, item4, item5, item6, item7, item8, item9]
  badTreats = [badItem1, badItem2, badItem3, badItem4, badItem5, badItem6, badItem7]
  treatsRand = random(treats)

  levelOne = new LevelOne()
  rope = new Rope()

  colors = { //object of button colors
    black:"#3b3939",
    violet:"#AAAAFF",
    yellow:"#fae17d"
  }
}

//let targetScore = [2,20,35,40,55,70,85,100,120,130,145,180]
//let targetScore = [2,5,10,15,20,25,30,35,40]
let targetScore = [5, 10, 15, 20, 25, 30, 35, 40]


function draw() {
  background(220);
  image(gamePage, 0, 0, 700, 600)
  rope.show()
  spaceCraft()
  targetPointUpdate()
  updateLives()
  updatenewlive()
    // bgm.play()
    // bgm.loop() //makes game awfully slow

  if (gameState == "L0") { //first UI, welcome page
    start() //welcome Page

    startButton.draw()
    startButton.resize(90, 60);
    startButton.textSize = 25
    startButton.text = "Start"
    startButton.locate(280, 310);
    startButton.strokeWeight = 4;
    startButton.stroke = colors.black;

    startButton.onPress = function () {
      this.color = colors.violet;

    }
    startButton.onHover = function () {
      this.color = colors.violet
    }
    startButton.onRelease = function () {
      gameState = "L1"
    }
    startButton.onOutside = function(){
    this.color = colors.yellow
}

  }

  if (gameState == "L1") {
   //image(treatsRand, randX,randY, 59, 46);

    for (let i = 0; i < loopl+3; i++) {
      itemOneArr.push(new LevelOne());
      itemOneArr[i].move(); //move items
      itemOneArr[i].display();
      
      //console.log(itemOneArr[i].x);
      //console.log(rope.pos_x);
      if (rope.pos_x + 70 > itemOneArr[i].x
        && rope.pos_x < itemOneArr[i].x
        && rope.pos_y + 60 > itemOneArr[i].y
        && rope.pos_y < itemOneArr[i].y
      ) { 
        yay.play()
        console.log(itemOneArr[i].x + "       item X")
        itemOneArr.splice(i, 1);//makes the flying item 'disappear'
        catchCount++;
       record = catchCount
        //console.log('SCORE'+catchCount)
      }
      fill(0, 102, 153);
      textSize(32);

    }
    for (let j = 0; j < loopl; j++) {  //loopl-1
      itemOneArrBad.push(new LevelOneBad());
      itemOneArrBad[j].move();
      itemOneArrBad[j].display();
      if (rope.pos_x + 70 > itemOneArrBad[j].x
        && rope.pos_x < itemOneArrBad[j].x
        && rope.pos_y + 60 > itemOneArrBad[j].y
        && rope.pos_y < itemOneArrBad[j].y
      ) { 
        //console.log(itemOneArr[i].x);
        ohno.play()
        itemOneArrBad.splice(j, 1); //makes the flying item 'disappear'
        catchBadCount++;
        //console.log('BAD'+catchBadCount);

        //console.log(catchCount)
      }
      fill(0, 102, 153);
      textSize(32);
    }
  }

  if (gameState == "L2") {
    //endPage();
    image(endPage, 0, 0, 700, 600)
    restartButton.draw()
    restartButton.resize(90, 60);
    restartButton.textSize = 25
    restartButton.text = "Again!"
    restartButton.locate(380, 320);
    restartButton.strokeWeight = 4;
    restartButton.stroke = colors.black;

    catchCount = 0;
    catchBadCount = 0;
    
      stroke('black')
      strokeWeight(6)
      fill('white')
      textSize(27)
      text("Score: " + record, 500,450)

    restartButton.onRelease = function () {
      gameState = "L0"
    }


  }



}//end draw


class Rope {

  constructor() {
    // suppose that center of the canvas is (400, 300)
    this.pos_x = 400;
    this.pos_y = 300;
    this.state = 0
    this.length = 0
    //1.length of rope has to do with the state per frame
    //2.angle of the rope has to do with mouse's x and y. does not change during states

  }

  show() {
    push()
    let max_length
    let new_x
    let new_y

    if (this.state == 0) { //no
      // line(400,300,401,301) //center of spacecraft
    } else if (this.state == 1) {//out
      max_length = sqrt((this.pos_x - 400) * (this.pos_x - 400) + (this.pos_y - 300) * (this.pos_y - 300))
      new_x = round(this.length * (this.pos_x - 400) / max_length + 400)
      new_y = round(this.length * (this.pos_y - 300) / max_length + 300)
      strokeWeight(3)
      stroke('red')
      line(400, 300, new_x, new_y)
      this.length += 6
      if (this.length > max_length) {
        this.state = 2
      }
    } else if (this.state == 2) {//in
      max_length = sqrt((this.pos_x - 400) * (this.pos_x - 400) + (this.pos_y - 300) * (this.pos_y - 300))
      new_x = round(this.length * (this.pos_x - 400) / max_length + 400)
      new_y = round(this.length * (this.pos_y - 300) / max_length + 300)
      strokeWeight(3)
      stroke('red')
      line(400, 300, new_x, new_y)

      this.length -= 6
      if (this.length < 1) // set to 1, not 0
      {
        this.state = 0
        this.length = 0
      }
    }
   console.log(this.pos_x);
    //console.log(mouseX + "   mouse")
    pop()
  }
}

function mousePressed() {

  if (mouseButton === LEFT) {
    strokeWeight(3)
    stroke('black')
    laser.play()

    rope.pos_x = mouseX
    rope.pos_y = mouseY
    //image(item2, rope.pos_x, rope.pos_y, 50, 50)

    rope.state = 1
  }

}

function start() {
  image(startPage, 0, 0, 700, 600)
}
//----------------------------------------------
function endPage() {
  image(endPage, 0, 0, 700, 600)


}

