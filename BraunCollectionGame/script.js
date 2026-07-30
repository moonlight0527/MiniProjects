//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg;
let gameState = "start";
let combo = 0;

/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg = loadImage("assets/Background.png");
  catcherImg = loadImage("assets/Braun.png");
  fallingObjectImg = loadImage("assets/Droplet.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  
  //Resize
  backgroundImg.resize(400,400);
  catcherImg.resize(100,100);
  fallingObjectImg.resize(50,50);
  
  //Create catcher 
  catcher = new Sprite(catcherImg,200,340,80,80,"k");
  catcher.visible = false;

  //Create falling object
  fallingObject = new Sprite(fallingObjectImg,100,0,50,50);
  fallingObject.vel.y=2;
  fallingObject.rotationLock=true;
  fallingObject.visible = false;
}

/* DRAW LOOP REPEATS */
function draw() {
  //Start Screen
  if(gameState == "start"){
    image(backgroundImg,0,0);

    fill(255,255,255,220);
    noStroke();
    rect(35,70,330,260,15);

    fill(0);
    textAlign(CENTER);
    textSize(28);
    text("Braun Catcher",200,120);

    textSize(16);
      text("Move Braun with the arrow keys\nand catch the droplets!\n\nBuild combos by never missing!\n\nPress SPACE to Start",200,190);

    if(kb.presses("space")){
      catcher.visible = true;
      fallingObject.visible = true;
      gameState = "play";
    }

    return;
  }
  
  // Draw Background
  image(backgroundImg,0,0);
  fill(255,255,255,200);
  noStroke();
  rect(0,0,400,400);
  
  
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move Braun \nwith the \nleft and right \narrow keys to \ncatch the falling \nodroplets.", width-50, 20);

  // If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height){
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    combo = 0;
  }

  // Move catcher
  if (kb.pressing("left")){
    catcher.vel.x=-5;
  } else if (kb.pressing("right")){
    catcher.vel.x=5;
  } else {
    catcher.vel.x=0;
  }

  // Stop catcher at edges of screen
  if (catcher.x <40){
    catcher.x=40;
  }else if (catcher.x>360){
    catcher.x=360;
  }

  // If fallingObject collides with the catcher, move back to random position at top
  if (fallingObject.collides(catcher)){
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(2,4);
    fallingObject.direction="down";
    combo++;
    score = score + combo;
  }
  
  fill("#000000");
  textSize(20);
  text("Score = "+score,50,20);

  fill("#0055ff");
  textSize(18);
  text("Combo x"+combo,50,45);
}