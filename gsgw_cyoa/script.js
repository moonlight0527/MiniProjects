let buttons = [];
let screen = "start";
let loopMode = false;
let trainColor = "#303040";
let stationIndex = 0;
let stations = [
  "Segwang Station",
  "Midnight Station",
  "Hanbit Library",
  "Twilight Station",
  "Blood Broadcasting Station",
  "Nap Shelter",
  "Balance Court"
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
title:"The Forest That Never Lets Go",

color:"#243326",

text:
"You step into the fog.\n"+
"Among the trees, you see figures hanging silently.\n"+
"They whisper your name and ask you to join them.\n\n"+
"You step closer.\n"+
"A rope suddenly wraps around your neck.\n\n"+
"You die inside the dream...\n"+
"But when you wake up, your body is untouched.\n"+
"Only the pain remains."
},



{
title:"The Price of Survival",

color:"#3b1616",

text:
"A casino waits beyond the station.\n"+
"Food and supplies are everywhere.\n\n"+
"But the exchange counter wants something else.\n"+
"Your body parts become the currency.\n\n"+
"You gamble until there is nothing left.\n"+
"When you wake up...\n"+
"the parts you lost can no longer move."
},



{
title:"The Missing Page",

color:"#202047",

text:
"A library made of endless books surrounds you.\n\n"+
"You find a mirror showing another version of yourself.\n"+
"Then another.\n"+
"And another.\n\n"+
"You realize they are pieces of your memories.\n"+
"The library wants someone to guard its knowledge.\n\n"+
"You become its librarian forever."
},



{
title:"The Weight of What You Took",

color:"#c59d52",

text:
"The market looks abandoned.\n"+
"Items sit waiting for someone to take them.\n\n"+
"You take what you need.\n\n"+
"Then the heat begins rising.\n"+
"The air burns your skin.\n\n"+
"The market was not empty.\n"+
"It was judging you."
},



{
title:"Now Broadcasting Forever",

color:"#8f1f3f",

text:
"A shopping broadcast welcomes you.\n\n"+
"A contract promises food and safety.\n"+
"Only one day of work.\n\n"+
"The cameras never stop.\n"+
"The products always need another demonstration.\n\n"+
"Even after death...\n"+
"your contract continues."
},



{
title:"A Peaceful Rest",

color:"#d8b56b",

text:
"The station looks like home.\n\n"+
"Warm lights.\n"+
"Familiar voices.\n"+
"A place where you can finally rest.\n\n"+
"You close your eyes.\n\n"+
"When you sleep here...\n"+
"you never wake up."
},



{
title:"The Final Judgment",

color:"#eeeeee",

text:
"You enter a silent courtroom.\n\n"+
"A scale waits before you.\n"+
"One side holds your heart.\n"+
"The other holds what you love most.\n\n"+
"What matters more?\n"+
"Your morals...\n"+
"or the person you want to see again?\n\n"+
"The scale moves."
}


];

function showEnding(){
  let index=int(screen.replace("ending",""));
  let ending=endingTexts[index];
  background(ending.color);
  // readable background
  fill(0,150);
  rect(50, 40, width-100, height-120, 15);
  fill("white");
  let fullText="ENDING: "+ending.title+"\n\n"+ending.text;
  if(endingFullText!=fullText){
    endingFullText=fullText;
    endingDisplay="";
    typingIndex=0;
  }
  if(typingIndex<endingFullText.length){
    endingDisplay+=endingFullText.charAt(typingIndex);
    typingIndex++;
  }
  textSize(14);
  text(endingDisplay, width/2, height/2-90, 480, 240);
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
