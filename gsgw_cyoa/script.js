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

// ending page system
let endingPage = 0;
let endingLinesPerPage = 12;


// =====================
// SETUP
// =====================

function setup(){
  createCanvas(600,400);
  textFont("Arial");
  textAlign(CENTER,CENTER);
  createButtons();
}


// =====================
// DRAW
// =====================

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


// =====================
// BUTTON SYSTEM
// =====================

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

function setButton(index,x,y,label){
  let b = buttons[index];
  b.pos = {
    x:x,
    y:y
  };
  b.text = label;
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

// =====================
// START SCREEN
// =====================

function showStart(){
  if(loopMode){
    background("#151010");
    fill("white");
    textSize(18);
    textAlign(LEFT, TOP);
    text(
      "The sound of metal grinding against tracks pulls you awake.\n\n" +
      "You don't remember boarding this train.\n\n" +
      "Outside the window is a city you don't recognize.",
      75, 60, 450, 250
    );
    setButton(
      0,
      width/2,
      height-50,
      "Begin Again"
    );
  }
  else{
    background(trainColor);
    fill("white");
    textSize(18);
    textAlign(LEFT, TOP);
    text(
      "The sound of metal grinding against tracks pulls you awake.\n\n" +
      "You don't remember boarding this train.\n\n" +
      "Outside the window is a city you don't recognize.",
      75, 60, 450, 250
    );
    setButton(
      0,
      width/2,
      height-50,
      "Continue"
    );
  }
}

// =====================
// TRAIN
// =====================

function showTrain(){
  background(trainColor);
  fill("white");
  textSize(18);
  textAlign(LEFT, TOP);
  let trainText=[
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
    "Those seeking rescue must be judged."
  ];

  text(
    stations[stationIndex] +
    "\n\n" +
    trainText[stationIndex] +
    "\n\n" +
    "The doors begin to open.",
    75,55,450,250
  );
  setButton(
    0,
    width/2-80,
    height-45,
    "Get Off"
  );
  setButton(
    1,
    width/2+80,
    height-45,
    "Stay On Train"
  );
}



// =====================
// CLICK HANDLING
// =====================

function mousePressed(){
  // BUTTON 0
  if(buttons[0].mouse.presses()){
    // start -> train
    if(screen=="start"){
      if(loopMode){
        loopMode=false;
      }
      screen="train";
    }
    // get off train
    else if(screen=="train"){
      screen="ending"+stationIndex;
      endingPage=0;
    }
    // ending -> start
    else if(screen.startsWith("ending")){
      screen="start";
      loopMode=false;
      stationIndex=0;
      endingPage=0;
    }
    // collection -> start
    else if(screen=="endingCollection"){
      screen="start";
      loopMode=false;
      stationIndex=0;
    }
    // loop -> loop start
    else if(screen=="loop"){
      screen="start";
      loopMode=true;
      stationIndex=0;
    }
  }
  // BUTTON 1
  if(buttons[1].mouse.presses()){
    // stay on train
    if(screen=="train"){
      stationIndex++;
      if(stationIndex>=stations.length){
        screen="loop";
      }
    }
    // ending pages - FIX THIS SECTION
    else if(screen.startsWith("ending")){
      if(endingPage >= getEndingPages() - 1){
        screen="endingCollection";
      } else {
        endingPage++;
      }
    }
  }
  // BUTTON 2
  if(buttons[2].mouse.presses()){
    if(screen.startsWith("ending")){
      endingPage++;
    }
  }
}

let endingTexts = [
{
title:"The Forest's Invitation",
color:"#243326",
text:
"You step into the thick fog surrounding the forest.\n\n"+
"The trees stretch endlessly into the darkness.\n"+
"Among the branches, you see people hanging silently.\n\n"+
"They whisper your name.\n"+
"They tell you to join them.\n\n"+
"You slowly walk closer, unable to resist their voices.\n\n"+
"Suddenly, something tightens around your neck.\n\n"+
"A noose.\n\n"+
"You feel yourself being pulled upward.\n"+
"You cannot breathe.\n\n"+
"Everything goes black.\n\n"+
"You wake up on the train.\n"+
"Your body is perfectly fine.\n\n"+
"But the memory of the rope never disappears."
},
{
title:"The Price of Survival",
color:"#3b1616",
text:
"You enter a casino filled with bright lights.\n\n"+
"A sign welcomes you.\n"+
"Trade your body. Earn coins.\n\n"+
"The food and supplies are real.\n"+
"But nothing here is free.\n\n"+
"You exchange parts of yourself to survive.\n\n"+
"A finger.\n"+
"An eye.\n"+
"More than you wanted to lose.\n\n"+
"You finally escape.\n\n"+
"When you wake up, everything seems normal.\n\n"+
"But the parts you traded away remain useless.\n\n"+
"The casino gave you survival.\n"+
"It kept the price forever."
},
{
title:"The Missing Page",
color:"#202047",
text:
"You enter a library hidden inside a cave of books.\n\n"+
"The shelves continue endlessly.\n\n"+
"You find a window reflecting yourself.\n\n"+
"Then another reflection appears.\n"+
"And another.\n"+
"And another.\n\n"+
"They are different versions of you.\n"+
"Different choices.\n"+
"Different memories.\n\n"+
"The owner of the library has been searching for someone.\n\n"+
"A librarian.\n\n"+
"You finally understand.\n\n"+
"You were never exploring the library.\n"+
"The library was choosing you."
},
{
title:"The Weight of What You Took",
color:"#c59d52",
text:
"You enter a silent market.\n\n"+
"Every stall is filled with abandoned items.\n\n"+
"No one stops you from taking them.\n\n"+
"At first, it feels like luck.\n\n"+
"Then the heat begins.\n\n"+
"The ground burns beneath you.\n"+
"The air becomes impossible to breathe.\n\n"+
"The more you take,\n"+
"the hotter the station becomes.\n\n"+
"The market was never empty.\n\n"+
"It was judging your conscience."
},
{
title:"Now Broadcasting Forever",
color:"#8f1f3f",
text:
"You enter Delusion Home Shopping #4-168.\n\n"+
"Bright lights surround you.\n"+
"An announcer welcomes you.\n\n"+
"A temporary employee contract appears.\n\n"+
"Food.\n"+
"Safety.\n"+
"A simple job.\n\n"+
"You sign.\n\n"+
"The products you demonstrate are deadly.\n\n"+
"The cameras never stop recording.\n\n"+
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
"Someone calls your name.\n\n"+
"They tell you to rest.\n"+
"Just for a little while.\n\n"+
"You are tired.\n"+
"So tired.\n\n"+
"You close your eyes.\n\n"+
"When you fall asleep,\n"+
"you never wake up again.\n\n"+
"The shelter welcomes you home forever."
},
{
title:"The Final Judgment",
color:"#eeeeee",
text:
"You enter a silent courtroom.\n\n"+
"People stand in a long line.\n"+
"Those who fail never leave.\n\n"+
"Finally, it is your turn.\n\n"+
"A scale appears.\n\n"+
"One side holds your sins.\n"+
"The other holds what you love most.\n\n"+
"The voice asks:\n\n"+
"Would you sacrifice everything to return home?\n\n"+
"The scale moves slowly.\n\n"+
"The result remains unknown."
}
];

// =====================
// SPLIT TEXT INTO PAGES
// =====================

function getEndingPages(){
  let index=int(screen.replace("ending",""));
  let full =
  "ENDING: "+
  endingTexts[index].title+
  "\n\n"+
  endingTexts[index].text;
  let lines = full.split("\n");
  return Math.ceil(lines.length / endingLinesPerPage);
}
function getEndingPageText(){
  let index=int(screen.replace("ending",""));
  let full =
  "ENDING: "+
  endingTexts[index].title+
  "\n\n"+
  endingTexts[index].text;
  let lines = full.split("\n");
  let start = endingPage * endingLinesPerPage;
  return lines
  .slice(start,start+endingLinesPerPage)
  .join("\n");
}

// =====================
// SHOW ENDING
// =====================

function showEnding(){
  let index = int(screen.replace("ending",""));
  let ending = endingTexts[index];
  background(ending.color);
  // text box
  fill(0,150);
  rect(40,35,width-80,height-120,15);
  fill("white");
  // text settings
  textAlign(LEFT,TOP);
  textSize(14);
  text(
    getEndingPageText(),
    65,60,470,250
  );
  // unlock ending
  if(!unlocked.includes(index)){
    unlocked.push(index);
  }
  // buttons
  textAlign(CENTER,CENTER);
  if(endingPage < getEndingPages()-1){
    setButton(
      1,
      width/2,
      height-45,
      "Next"
    );
  }
  else{
    setButton(
      0,
      width/2-80,
      height-45,
      "Start Over"
    );
    setButton(
      1,
      width/2+80,
      height-45,
      "Endings"
    );
  }
}

// =====================
// ENDING COLLECTION
// =====================

function showCollection(){
  background("#151515");
  fill("white");
  textAlign(LEFT, TOP);
  textSize(16);
  let list="ENDINGS\n\n";
  for(let i=0;i<endings.length;i++){
    if(unlocked.includes(i)){
      list += "✓ "+endings[i]+"\n";
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
  text(list, 90, 50, 420, 280);
  textAlign(CENTER,CENTER);
  setButton(
    0,
    width/2,
    height-45,
    "Return to Start"
  );
}

// =====================
// SECRET LOOP ENDING
// =====================

function showLoop(){
  background("#100909");
  if(!unlocked.includes(7)){
    unlocked.push(7);
  }
  fill("white");
  textAlign(LEFT,TOP);
  textSize(15);
  text(
    "SECRET ENDING: The Endless Route\n\n"+
    "The train continues moving.\n\n"+
    "One station passes.\n"+
    "Then another.\n\n"+
    "You never leave.\n\n"+
    "The lights flicker.\n\n"+
    "The sound of metal against the tracks pulls you awake.\n\n"+
    "You open your eyes.\n\n"+
    "You are sitting inside a subway train.\n\n"+
    "...\n\n"+
    "Why does this feel familiar?\n"+
    "Why do you already know what happens next?",
    70,
    50,
    460,
    280
  );
  textAlign(CENTER,CENTER);
  setButton(
    0,
    width/2,
    height-45,
    "Begin Again"
  );
}
