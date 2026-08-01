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
  textFont("Arial");
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
    textSize(18);
    text(
    "The sound of metal grinding against tracks pulls you awake.\n\n"+
    "The same train.\n"+
    "The same lights.\n"+
    "The same feeling.\n\n"+
    "Wait...\n\n"+
    "Have I already done this?",
    width/2,
    height/2-80,500,220
    );
    setButton(0, width/2, height-60, "Begin Again");
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
    height/2-70,500,200
    );
    setButton(0, width/2, height-60, "Continue");
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
    height/2-70,500,220
  );

  setButton(0, width/2-80, height-50, "Get Off");
  setButton(1, width/2+80, height-50, "Stay On Train");
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
      endingFullText="";
      endingDisplay="";
      typingIndex=0;
    }
    // Ending -> start
    else if(screen.startsWith("ending")){
      screen="start";
      loopMode=false;
      stationIndex=0;
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
"You step into the thick fog surrounding the forest.\n\n"+

"The trees stretch endlessly into the darkness.\n"+
"Among the branches, you see shapes hanging silently.\n\n"+

"They look like people.\n"+
"They whisper your name.\n"+
"They tell you to join them.\n\n"+

"You slowly walk closer, unable to resist their voices.\n\n"+

"Suddenly, something tightens around your neck.\n\n"+

"A rope.\n\n"+

"You feel yourself being pulled upward.\n"+
"You cannot breathe.\n"+
"You feel yourself dying inside the dream.\n\n"+

"Then everything goes black.\n\n"+

"You wake up on the train.\n"+
"Your body is perfectly fine.\n\n"+

"But the memory of the rope around your neck never disappears."
},

{
title:"The Price of Survival",
color:"#3b1616",
text:
"You step into a casino filled with bright lights and cheerful music.\n\n"+

"A sign welcomes you.\n"+
"Trade your body. Earn coins.\n\n"+

"At first, it seems impossible.\n"+
"But the food and supplies are real.\n\n"+

"You exchange pieces of yourself for another chance to survive.\n\n"+

"A finger.\n"+
"An eye.\n"+
"More than you wanted to lose.\n\n"+

"You gamble until you finally escape.\n\n"+

"When you wake up in reality, you expect everything to return to normal.\n\n"+

"But the parts you traded away remain useless.\n"+
"Paralyzed.\n\n"+

"The casino gave you survival.\n"+
"But it kept the price forever."
},

{
title:"The Missing Page",
color:"#202047",
text:
"You enter a library hidden inside a cave of endless books.\n\n"+

"The shelves continue farther than they should.\n"+
"Every book contains a memory.\n\n"+

"You find a window.\n"+
"Your reflection looks back.\n\n"+

"Then another appears.\n"+
"And another.\n"+
"And another.\n\n"+

"You realize they are different versions of yourself.\n"+
"Different choices.\n"+
"Different lives.\n\n"+

"The library's owner has been searching for someone.\n\n"+

"A librarian.\n\n"+

"Someone who understands every page of themselves.\n\n"+

"You finally understand too late.\n\n"+

"You were never exploring the library.\n"+
"The library was choosing you."
},

{
title:"The Weight of What You Took",
color:"#c59d52",
text:
"You enter a silent market.\n\n"+

"Every stall is filled with abandoned items.\n"+
"No one is watching.\n\n"+

"You take something.\n\n"+

"At first, nothing happens.\n\n"+

"Then the heat begins.\n"+
"The air becomes unbearable.\n"+
"The ground starts burning.\n\n"+

"The more you carry,\n"+
"the hotter the station becomes.\n\n"+

"You realize the market was never empty.\n\n"+

"It was judging your conscience."
},

{
title:"Now Broadcasting Forever",
color:"#8f1f3f",
text:
"You enter Delusion Home Shopping #4-168.\n\n"+

"Bright lights surround you.\n"+
"An announcer welcomes you with a smile.\n\n"+

"A temporary employee contract appears.\n\n"+

"Food.\n"+
"Safety.\n"+
"A simple job.\n\n"+

"You sign.\n\n"+

"The products you demonstrate are not normal.\n"+
"Each one kills the person testing it.\n\n"+

"The cameras keep recording.\n"+
"The audience keeps watching.\n\n"+

"Even after your body stops moving,\n"+
"your contract continues.\n\n"+

"Welcome to eternal employment."
},

{
title:"A Peaceful Rest",
color:"#d8b56b",
text:
"You step into a familiar neighborhood.\n\n"+

"The sunlight feels warm.\n"+
"The voices feel familiar.\n\n"+

"Someone you love calls your name.\n\n"+

"They tell you to rest.\n"+
"Just for a little while.\n\n"+

"You are tired.\n"+
"So tired.\n\n"+

"You close your eyes.\n\n"+

"When you fall asleep,\n"+
"you never wake up again.\n\n"+

"The shelter finally gives you the peace you wanted."
},

{
title:"The Final Judgment",
color:"#eeeeee",
text:
"You enter a silent courtroom.\n\n"+

"People stand in a long line waiting for judgment.\n\n"+

"One by one, they step forward.\n"+
"Those who fail never leave.\n\n"+

"Finally, it is your turn.\n\n"+

"A scale appears.\n\n"+

"One side holds your sins.\n"+
"The other holds the person you love most.\n\n"+

"The voice asks:\n\n"+

"Would you sacrifice everything to see them again?\n\n"+

"The scale moves slowly.\n\n"+

"But the result remains unknown."
}

];

function showEnding(){
  let index=int(screen.replace("ending",""));
  let ending=endingTexts[index];
  background(ending.color);
  // readable background
  fill(0,150);
  rect(35,30,width-70,height-110,15);
  fill("white");
  textSize(14);
  let fullText=
  "ENDING: "+ending.title+"\n\n"+ending.text;
  if(endingFullText!=fullText){
    endingFullText=fullText;
    endingDisplay="";
    typingIndex=0;
  }
  if(typingIndex<endingFullText.length){
    endingDisplay+=endingFullText.charAt(typingIndex);
    typingIndex+=2;
  }
  text(
    endingDisplay, width/2, height/2-70, 500, 230);
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
  text(list, width/2, height/2-80,450,260);
  setButton(0, width/2, height-40, "Return to Start");
}

//  SECRET LOOP ENDING 
function showLoop(){
  background("#100909");
  if(!unlocked.includes(7)){
    unlocked.push(7);
  }
  fill("white");
  textSize(16);
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
  
  width/2, height/2-70,500,260
  );
  setButton(0, width/2, height-40, "Begin Again");
}
