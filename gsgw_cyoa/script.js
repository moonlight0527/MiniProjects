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
  "The Forest That Never Lets Go",
  "The Price of Survival",
  "The Missing Page",
  "The Weight of What You Took",
  "Now Broadcasting Forever",
  "A Peaceful Rest",
  "The Final Judgment",
  "The Endless Route"
];
let secretEndings = [
  "The Endless Route"
];
let unlocked = [];

function setup() {
  createCanvas(600,400);
  textAlign(CENTER,CENTER);
  textSize(18);
  noStroke();
  createButtons();
}

function draw() {
  background(30);
  hideButtons();
  fill("white");
  noStroke();
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

//  BUTTON SYSTEM

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
  let b=buttons[index];
  b.pos={x:x,y:y};
  b.text=text;
  b.visible=true;
}

function hideButtons(){
  for(let b of buttons){
    b.pos={x:-200,y:-200};
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
    setButton(0,width/2,height-70,"Begin Again");
  }
  else{
    background(trainColor);
    fill("white");
    text(
    "The sound of metal grinding against tracks pulls you awake.\n\n"+
    "You don't remember boarding this train.\n\n"+
    "Outside the window is a city you don't recognize.",
    width/2,
    height/2-70
    );
    setButton(0,width/2,height-70,"Continue");
  }
}

// TRAIN

function showTrain(){
  background(trainColor);
  fill("white");
  let name = stations[stationIndex];
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
  text(name+"\n\n"+textList[stationIndex]+"\n\n"+"The doors begin to open.",width/2,height/2-70);
  setButton(0,width/2-80,height-60,"Get Off");
  setButton(1,width/2+80,height-60,"Stay On Train");
}

// CLICK HANDLING

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
    }
    // Ending collection
    else if(screen=="endingCollection"){
      screen="start";
      loopMode=false;
      stationIndex=0;
    }
    // Time loop restart
    else if(screen=="loop"){
      screen="start";
      loopMode=true;
      stationIndex=0;
    }
  }
  if(buttons[1].mouse.presses()){
    // Train -> stay
    if(screen=="train"){
      stationIndex++;
      if(stationIndex>=stations.length){
        screen="loop";
      }
    }
    // Ending -> collection
    else if(screen.startsWith("ending")){
      screen="endingCollection";
    }
  }
}

// STATION ENDINGS

let endingTexts = [
  // Segwang Forest
  {
    title:"The Forest That Never Lets Go",
    color:"#243326",
    text:
    "You step into the fog.\n"+
    "The station disappears behind you.\n"+
    "The forest is silent, but you can feel something watching.\n"+
    "You try to follow the path back, but every direction looks the same.\n"+
    "The fog fills your mind with strange voices and forgotten memories.\n"+
    "You cannot remember how long you have been walking.\n"+
    "Eventually, you stop searching for the exit.\n"+
    "The forest has already decided that you belong here."
  },
  // Casino
  {
    title:"The Price of Survival",
    color:"#3b1616",
    text:
    "The station is brighter than you expected.\n"+
    "A casino waits beyond the platform.\n"+
    "Food, water, and supplies are available.\n"+
    "But nothing here is free. The exchange counter does not ask for money.\n"+
    "It asks what part of yourself you are willing to give away.\n"+
    "You escape with what you needed.\n"+
    "But when you wake up again, something is wrong.\n"+
    "The casino gave you a way out.\n"+
    "It just decided the price."
  },
  // Library
  {
    title:"The Missing Page",
    color:"#202047",
    text:
    "The library stretches endlessly around you.\n"+
    "Every shelf leads somewhere impossible.\n"+
    "You find a window reflecting yourself.\n"+
    "But there is more than one version of you staring back.\n"+
    "Memories you forgot.\n"+
    "Choices you never made.\n"+
    "The library offers answers, but the longer you search,\n the harder it becomes to remember who you are.\n"+
    "When you finally leave, you wonder if you escaped...\n"+
    "Or if the library simply allowed you to."
  },
  // Conscience Market
  {
    title:"The Weight of What You Took",
    color:"#c59d52",
    text:
    "The market looks abandoned.\n"+
    "Everything is left behind.\n"+
    "Nobody stops you from taking what you need.\n"+
    "At first, it feels like luck.\n"+
    "Then the temperature begins to rise.\n"+
    "The station burns brighter with every item you carry.\n"+
    "You realize the market was never empty.\n"+
    "It was waiting to see what kind of person you were."
  },
  // Blood Broadcast
  {
    title:"Now Broadcasting Forever",
    color:"#8f1f3f",
    text:
    "The station welcomes you with applause.\n"+
    "A contract promises food and safety.\n"+
    "Just one day of work.\n"+
    "That is what they tell you.\n"+
    "The cameras never stop recording.\n"+
    "The audience always wants more.\n"+
    "Even when your body gives up, the contract remains.\n"+
    "The broadcast continues forever."
  },
  // Nap Shelter
  {
    title:"A Peaceful Rest",
    color:"#d8b56b",
    text:
    "The station looks like home.\n"+
    "Warm lights shine from every window.\n"+
    "The smell of food fills the air.\n"+
    "Someone tells you to rest.\n"+
    "You are tired.\n"+
    "So tired.\n"+
    "You close your eyes for only a moment.\n"+
    "The station welcomes you home.\n"+
    "And it never lets you leave."
  },
  // Court
  {
    title:"The Final Judgment",
    color:"#eeeeee",
    text:
    "The courtroom is completely silent.\n"+
    "A voice tells you that only the worthy may leave.\n"+
    "A scale waits before you.\n"+
    "One side represents your heart.\n"+
    "The other represents what you value most.\n"+
    "The question is simple:\n"+
    "What would you sacrifice to return home?\n"+
    "The scale moves.\n"+
    "The judgment has been decided."
  }
];

function showEnding(){
  let index = int(screen.replace("ending",""));
  let ending = endingTexts[index];
  background(ending.color);
  if(index == 3 || index == 5 || index == 6){
  fill("black");
  }
  else{
    fill("white");
  }

  textSize(14);
  text(
    "ENDING:"+
    ending.title+"\n\n"+
    ending.text,
    width/2,
    height/2-40
  );
  if(!unlocked.includes(index)){
    unlocked.push(index);
  }
  setButton(0,width/2-80,height-40,"Start Over");
  setButton(1,width/2+80,height-40,"Endings");
}

// ENDING COLLECTION 

function showCollection(){
  background("#151515");
  let list="ENDINGS\n\n";
  for(let i=0;i<endings.length;i++){
    if(unlocked.includes(i)){
      list += "✓ " + endings[i] + "\n";
    }
    else{
    if(i == 7){
      list += "□ Secret Ending\n";
    }
    else{
      list += "□ ???\n";
    }
}
  }
  textSize(16);
  text(
    list,
    width/2,
    height/2-60
  );
  setButton(
    0,
    width/2,
    height-50,
    "Return to Start"
  );
}

// TIME LOOP 

function showLoop(){
  background("#100909");
  // Unlock secret ending
  if(!unlocked.includes(7)){
    unlocked.push(7);
  }
  textSize(14);
  text(
  "The train continues moving.\n"+
  "One station passes.\n"+
  "Then another.\n"+
  "You never leave.\n"+
  "The lights flicker.\n"+
  "The sound of metal against the tracks pulls you awake.\n"+
  "You open your eyes.\n"+
  "You are sitting inside a subway train.\n"+
  "... \n\n"+
  "Why does this feel familiar?\n"+
  "Why do you already know what happens next?",
  width/2,
  height/2-80
  );
  setButton(
    0,
    width/2,
    height-40,
    "Begin Again"
  );
}