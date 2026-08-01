let buttons = [];
let screen = "start";
let loopMode = false;
let trainColor = "#303040";
let stationIndex = 0;
let stations = [
  "Segwang Station",
  "Midnight Station",
  "Night Station",
  "Twilight Station",
  "Afternoon Station",
  "Midday Station",
  "Morning Station"
];

let endings = [
  "The Forest's Invitation",
  "The Price of Survival",
  "The Missing Page",
  "The Weight of What You Took",
  "Now Broadcasting Forever",
  "A Peaceful Rest",
  "The Final Judgment",
  "The Endless Route"
];

let unlocked = [];

// typing system
let endingDisplay = "";
let endingFullText = "";
let typingIndex = 0;

function setup(){
  createCanvas(600,400);
  textAlign(CENTER,CENTER);
  textSize(18);
  noStroke();
  createButtons();
}

function draw(){
  background(30);
  hideButtons();
  if(screen=="start"){
    showStart();
  }
  else if(screen=="train"){
    showTrain();
  }
  else if(screen=="endingCollection"){
    showCollection();
  }
  else if(screen=="loop"){
    showLoop();
  }
  else if(screen.startsWith("ending")){
    showEnding();
  }
}

// BUTTON SYSTEM

function createButtons(){
  for(let i=0;i<3;i++){
    let b = new Sprite(-100,-100);
    b.w = 130;
    b.h = 45;
    b.collider="k";
    b.color="white";
    buttons.push(b);
  }
}

function setButton(index,x,y,text){
  let b = buttons[index];
  b.pos={
    x:x,
    y:y
  };
  b.text=text;
  b.visible=true;
}

function hideButtons(){
  for(let b of buttons){
    b.pos={
      x:-200,
      y:-200
    };
  }
}

// START 

function showStart(){
  if(loopMode){
    background("#151010");
    fill("white");
    textSize(20);
    text(
    "The sound of metal grinding against tracks pulls you awake.\n\n"+
    "The same train.\n"+
    "The same lights.\n"+
    "The same feeling.\n\n"+
    "Wait...\n\n"+
    "Have I already done this?",
    width/2,
    height/2-80
    );
    setButton(0, width/2, height-70, "Begin Again");
  }
  else{
    background(trainColor);
    fill("white");
    textSize(18);
    text(
    "The sound of metal grinding against tracks pulls you awake.\n\n"+
    "You don't remember boarding this train.\n\n"+
    "Outside the window is a city you don't recognize.",
    width/2,
    height/2-70
    );
    setButton(0, width/2, height-70, "Continue");
  }
}

//  TRAIN 

function showTrain(){
  background(trainColor);
  fill("white");
  let textList=[
  "The train slows down.\n\n"+
  "Outside the window, only a dark forest remains.",

  "Bright lights shine outside the train.\n\n"+
  "A strange building waits beside the platform.",

  "The station is silent.\n\n"+
  "Endless shelves of books disappear into darkness.",

  "Abandoned stalls fill the platform.\n\n"+
  "Everything waits for someone to take it.",

  "Applause echoes outside.\n\n"+
  "A screen welcomes you to a shopping broadcast.",

  "A peaceful neighborhood appears outside.\n\n"+
  "It feels strangely familiar.",

  "A white building stands outside.\n\n"+
  "A message appears: Those seeking rescue must be judged."
  ];

  text(
    stations[stationIndex]+
    "\n\n"+
    textList[stationIndex]+
    "\n\n"+
    "The doors begin to open.",
    width/2,
    height/2-80
  );

  setButton(0, width/2-80, height-60, "Get Off");
  setButton(1, width/2+80, height-60, "Stay On Train");
}

//  CLICK HANDLING 

function mousePressed(){
  if(buttons[0].mouse.presses()){
    // Start screen
    if(screen=="start"){
      screen="train";
    }
    // Train -> get off
    else if(screen=="train"){
      screen="ending"+stationIndex;
    }
    // Ending -> start
    else if(screen.startsWith("ending")){
      screen="start";
      loopMode=false;
      stationIndex=0;
      endingDisplay="";
      endingFullText="";
      typingIndex=0;
    }
    // Collection -> start
    else if(screen=="endingCollection"){
      screen="start";
      loopMode=false;
      stationIndex=0;
    }
    // Loop ending -> restart
    else if(screen=="loop"){
      screen="start";
      loopMode=true;
      stationIndex=0;
    }
  }
  if(buttons[1].mouse.presses()){
    // Stay on train
    if(screen=="train"){
      stationIndex++;
      if(stationIndex>=stations.length){
        screen="loop";
      }
    }
    // View endings
    else if(screen.startsWith("ending")){
      screen="endingCollection";
    }
  }
}

//  ENDINGS 

let endingTexts = [

{
title:"The Forest's Invitation",
color:"#243326",
text:
"You step into the fog.\n\n"+
"The moment your feet touch the forest floor, the station behind you disappears.\n"+
"Only endless trees remain.\n\n"+
"Through the thick fog, you see shadows hanging from the branches.\n"+
"At first, you convince yourself they are only trees.\n"+
"But then they move.\n\n"+
"Figures covered in darkness slowly turn toward you.\n"+
"They do not speak with their mouths.\n"+
"They speak inside your head.\n\n"+
"Come closer... Join us...\"\n\n"+
"You feel yourself walking forward even though you do not want to.\n"+
"Each step feels heavier than the last.\n\n"+
"Then something drops from above.\n"+
"A rope wraps around your neck.\n\n"+
"You try to scream, but no sound comes out.\n"+
"The forest pulls you upward.\n"+
"Your vision fades.\n\n"+
"You die.\n\n"+
"Then you wake up on the train.\n"+
"Your body is fine.\n"+
"No marks.\n"+
"No injuries.\n\n"+
"Except your neck still feels like something is holding on."
},

{
title:"The Price of Survival",
color:"#3b1616",
text:
"The station is brighter than expected.\n\n"+
"Music plays.\n"+
"Lights flash.\n"+
"A casino welcomes you inside.\n\n"+
"A sign hangs above the entrance:\n"+
"\"Trade what you have. Receive what you need.\"\n\n"+
"You think it means money.\n"+
"You are wrong.\n\n"+
"The exchange counter asks for your body.\n\n"+
"A finger.\n"+
"An eye.\n"+
"A piece of yourself.\n\n"+
"Every loss gives you more coins.\n"+
"Every coin gives you another chance to survive.\n\n"+
"You keep gambling.\n"+
"You keep believing you can win everything back.\n\n"+
"But eventually, the casino has taken enough.\n\n"+
"You collapse.\n\n"+
"When you wake up outside the dream, everything seems normal.\n\n"+
"Until you try to move.\n\n"+
"The body parts you traded away are still there...\n"+
"But they no longer belong to you."
},

{
title:"The Missing Page",
color:"#202047",
text:
"You enter the Hanbit Library.\n\n"+
"The walls are made of endless shelves.\n"+
"Books stretch farther than your eyes can see.\n\n"+
"You walk deeper.\n"+
"Searching for a way out.\n\n"+
"Then you find a window.\n\n"+
"Your reflection looks back at you.\n"+
"But it is not alone.\n\n"+
"Another version of yourself stands beside it.\n"+
"Then another.\n"+
"Then another.\n\n"+
"You realize they are not monsters.\n"+
"They are pieces of your life.\n"+
"Your memories.\n"+
"Your choices.\n"+
"Your regrets.\n\n"+
"The library offers you knowledge beyond anything you imagined.\n\n"+
"But it needs someone to protect it.\n"+
"Someone who understands the truth it contains.\n\n"+
"A librarian.\n\n"+
"The doors close behind you.\n\n"+
"The shelves continue growing.\n"+
"And your story becomes another book inside the library."
},

{
title:"The Weight of What You Took",
color:"#c59d52",
text:
"The station looks abandoned.\n\n"+
"Stalls line the platform.\n"+
"Objects sit untouched.\n"+
"No seller.\n"+
"No customers.\n\n"+
"Everything looks free.\n\n"+
"You take something.\n\n"+
"Nothing happens.\n\n"+
"You take more.\n\n"+
"Then the heat begins.\n\n"+
"The air becomes unbearable.\n"+
"The ground burns beneath your feet.\n"+
"The entire station turns white from the temperature.\n\n"+
"You finally understand.\n\n"+
"The market was never empty.\n"+
"It was waiting for someone to prove their conscience.\n\n"+
"The things you carried became the weight that burned you."
},

{
title:"Now Broadcasting Forever",
color:"#8f1f3f",
text:
"Applause fills the station.\n\n"+
"A bright smile welcomes you.\n"+
"A camera turns toward you.\n\n"+
"Congratulations! You have been selected as a temporary employee!\"\n\n"+
"The contract promises food.\n"+
"Safety.\n"+
"A way to survive.\n\n"+
"You sign.\n\n"+
"Your first job is simple.\n"+
"Demonstrate a product.\n\n"+
"But every product is something impossible.\n"+
"Something dangerous.\n"+
"Something that kills the person showing it.\n\n"+
"The audience loves it.\n"+
"The ratings increase.\n"+
"The cameras keep recording.\n\n"+
"Even after your body stops moving...\n"+
"The contract remains active.\n\n"+
"Welcome to Delusion Home Shopping.\n"+
"Your shift never ends."
},

{
title:"A Peaceful Rest",
color:"#d8b56b",
text:
"The station feels familiar.\n\n"+
"A quiet neighborhood stretches beyond the platform.\n"+
"Warm lights shine through the windows.\n\n"+
"You hear voices calling your name.\n\n"+
"They sound like people you trust.\n"+
"People you miss.\n\n"+
"Come home. You're tired. Rest.\"\n\n"+
"You know something feels wrong.\n"+
"But you are exhausted.\n\n"+
"Just a short rest.\n"+
"Just a moment.\n\n"+
"You close your eyes.\n\n"+
"When you wake up...\n"+
"You don't.\n\n"+
"The station finally gives everyone what they wanted.\n"+
"A place to stay forever."
},

{
title:"The Final Judgment",
color:"#eeeeee",
text:
"You enter the courtroom.\n\n"+
"Rows of people stand silently before you.\n"+
"One by one, they approach the scale.\n\n"+
"Those who fail disappear.\n\n"+
"Then your name is called.\n\n"+
"You stand before the Scale of Evil.\n\n"+
"One side holds your heart.\n"+
"The other holds the thing you love most.\n\n"+
"The question is not whether you are good.\n\n"+
"The question is:\n"+
"What would you sacrifice to return home?\n\n"+
"The scale begins moving.\n\n"+
"You think about the person waiting for you.\n"+
"You think about the choices you would make.\n\n"+
"The result is unclear.\n\n"+
"The courtroom goes silent.\n\n"+
"Did you pass?\n"+
"Or did the scale already decide?"
}

];

function showEnding(){
  let index=int(screen.replace("ending",""));
  let ending=endingTexts[index];
  background(ending.color);
  // readable background
  fill(0,150);
  rect(40,20,width-80,310,15);
  fill("white");
  let fullText=
  "ENDING: "+ending.title+
  "\n\n"+
  ending.text;
  if(endingFullText!=fullText){
    endingFullText=fullText;
    endingDisplay="";
    typingIndex=0;
  }
  if(typingIndex<endingFullText.length){
    endingDisplay+=endingFullText.charAt(typingIndex);
    typingIndex++;
  }
  // FIX TEXT POSITION
  textAlign(CENTER, TOP);
  textSize(12);
  text(
    endingDisplay, width/2, 35, 480, 280);
  // restore alignment for buttons
  textAlign(CENTER,CENTER);
  if(!unlocked.includes(index)){
    unlocked.push(index);
  }
  setButton(0, width/2-80, height-40, "Start Over");
  setButton(1, width/2+80, height-40, "Endings");
}

//  ENDING COLLECTION 

function showCollection(){
  background("#151515");
  fill("white");
  let list="ENDINGS\n\n";
  for(let i=0;i<endings.length;i++){
    if(unlocked.includes(i)){
      list += "✓ " + endings[i] + "\n";
    }
    else{
      if(i==7){
        list += "□ Secret Ending\n";
      }
      else{
        list += "□ ???\n";
      }
    }
  }
  textSize(16);
  text(list, width/2, height/2-60);
  setButton(0, width/2, height-50, "Return to Start");
}

//  SECRET LOOP ENDING 
function showLoop(){
  background("#100909");
  if(!unlocked.includes(7)){
    unlocked.push(7);
  }
  fill("white");
  textSize(14);
  text(
  "The train continues moving.\n\n"+

  "One station passes.\n"+
  "Then another.\n\n"+

  "You never leave.\n\n"+

  "The lights flicker.\n"+
  "The sound of metal against the tracks pulls you awake.\n\n"+

  "You open your eyes.\n\n"+

  "You are sitting inside a subway train.\n\n"+

  "... \n\n"+

  "Why does this feel familiar?\n"+
  "Why do you already know what happens next?",
  
  width/2, height/2-80
  );
  setButton(0, width/2, height-40, "Begin Again");
}
