// Game 1 global variable
var letters = 0,
  contents = "",
  randomword = "",
  wordLength = "",
  randomShape = "",
  tempwords = [],
  words = [
    "love",
    "rain",
    "dance",
    "trees",
    "work",
    "eight",
    "wheel",
    "apple",
    "ball",
    "track",
    "mouse",
    "hello",
    "knock",
    "loop",
    "smile",
    "truck",
  ];
// global variable
let nextround = false,
  enableClick = false,
  finish = false,
  game1 = false,
  game2 = false,
  game3 = false,
  replaygame1 = false,
  replaygame2 = false,
  replaygame3 = false,
  score,
  live,
  finalscore = 0,
  game1round = 1,
  game2round = 1,
  game3round = 1;

// game 3 global variable
let shapeMove = false,
  next = false,
  tempshapes = [];

// preload images for logos of main menu and shapes of matching game (unchanged)
function preload() {
  //LOGO
  abcImg = loadImage("pic/shape.png");
  shapeImg = loadImage("pic/abc.png");
  shipImg = loadImage("pic/ship.png");

  // MATCHING GAME SHAPES
  shape1 = loadImage("pic/shape1.png");
  shape2 = loadImage("pic/shape2.png");
  shape3 = loadImage("pic/shape3.png");
  shape4 = loadImage("pic/shape4.png");
  shape5 = loadImage("pic/shape5.png");
  shape6 = loadImage("pic/shape6.png");
  shape7 = loadImage("pic/shape7.png");
  shape8 = loadImage("pic/shape8.png");

  // TAPPING GAME IMG
  planet = loadImage("pic/planet.png");

  //SPACESHIP SFX
  shoot = loadSound("sfx/shoot.mp3");
  exploded = loadSound("sfx/exploded.mp3");

  // FEEDBACK
  star = loadImage("pic/star.png");
  bell = loadSound("sfx/right.mp3");
  buzzer = loadSound("sfx/wrong.mp3");

  // INSRUCTION IMG
  type1 = loadImage("pic/game1.png");
  type2 = loadImage("pic/correct1.png");
  type3 = loadImage("pic/incorrect1.png");

  tap1 = loadImage("pic/game2.png");
  tap2 = loadImage("pic/correct21.png");
  tap5 = loadImage("pic/correct24.png");

  match1 = loadImage("pic/game3.png");
  match2 = loadImage("pic/correct3.png");
  match3 = loadImage("pic/incorrect3.png");

  // CONTACT US LINK
  alink = createA("mailto:tnguy245@asu.edu", "tnguy245@asu.edu");
  alink.position(53, 350);
  alink.style("font-size", 21 + "px");
  alink.hide();
}

// check if the mouse is on any particular box or button
function mouseOnObj([x1, y1, x2, y2], space) {
  return (
    mouseX > x1 + space &&
    mouseX < x1 + x2 - space &&
    mouseY > y1 &&
    mouseY < y1 + y2
  );
}

// FUNCTION BOX
// customized back button
// BACK BOX
function BackButton() {
  push();
  noStroke();
  fill("white");
  rect(10, 20, 40, 40);
  fill("black");
  triangle(20, 40, 40, 30, 40, 50);
  pop();
  return [10, 20, 40, 40];
}

// NEXT BOX
function NextButton() {
  push();
  noStroke();
  fill("white");
  rect(280, 340, 40, 40);
  fill("black");
  triangle(310, 360, 290, 350, 290, 370);
  pop();
  return [280, 340, 40, 40];
}

// REPLAY BOX
function ReplayButton() {
  push();
  noStroke();
  fill("white");
  rect(10, 70, 40, 40);
  push();
  stroke(1);
  strokeWeight(5);
  circle(30, 90, 22);
  pop();
  rect(13, 82, 10);
  fill("black");
  triangle(17, 76, 17, 90, 30, 86);
  pop();
  return [10, 70, 40, 40];
}

// SETUP
function setup() {
  createCanvas(590, 400);

  // function button
  backbox = BackButton();
  nextbox = NextButton();
  replaybox = ReplayButton();
  mainMenu();
}

// creat rectangle box that is clickable
function clickRect(x1, y1, x2, y2) {
  rect(x1, y1, x2, y2);
  return [x1, y1, x2, y2];
}

// MAIN MENU
// used for go back from games and credits;
function mainMenu() {
  // background color
  background(220);
  // remove border
  strokeWeight(0);
  // logos
  image(abcImg, 423, 175, abcImg.width / 5, abcImg.height / 5);
  image(shapeImg, 90, 160, shapeImg.width / 5, shapeImg.height / 5);
  image(shipImg, 255, 165, shipImg.width / 6.25, shipImg.height / 6.25);

  // program titles
  textSize(60);
  text("Mini Me Motors", 100, 120);

  // Game boxes
  textSize(30);
  typebox = clickRect(70, 250, 140, 70);
  text("Typing", 95, 295);
  tapbox = clickRect(230, 250, 140, 70);
  text("Tapping", 250, 295);
  matchbox = clickRect(390, 250, 140, 70);
  text("Matching", 400, 295);

  // Instruction boxes
  textSize(15);
  inbox1 = clickRect(95, 325, 90, 30);
  text("How to play", 101, 345);
  inbox2 = clickRect(255, 325, 90, 30);
  text("How to play", 261, 345);
  inbox3 = clickRect(415, 325, 90, 30);
  text("How to play", 421, 345);

  // credits box
  textSize(15);
  crebox = clickRect(505, 17, 70, 30);
  text("Credits", 517, 37);

  // click is locked when in game
  enableClick = true;
  // new data is radomized for each new game
  newWords();
  newCircles();
  newShapes();
}

// NEWWORDS
// randomized data: random words and random objects for tapping
function newWords() {
  letters = 0;
  contents = "";
  randomword = "";
  wordLength = "";

  // set random word and define its length
  if (tempwords.length === 0) {
    tempwords = words.slice();
  }
  randomword = random(tempwords);
  // locate index of randomword
  let wordIndex = tempwords.indexOf(randomword);
  // remove word from set of words to avoid repetition
  tempwords.splice(wordIndex, 1);
  // define word's length
  wordLength = randomword.length;
}
// NEWCIRCLES
function newCircles() {
  function randomCircle(radrange) {
    x = random(50, 200);
    y = random(50, 200);
    rad = random(radrange, radrange + 10);
    xspeed = random(2, 3);
    yspeed = random(1, 2);
    return [x, y, rad, xspeed, yspeed];
  }
  // define original appearing cirles, picture and status
  o1_fill = o2_fill = o3_fill = o4_fill = color("default");
  p_fill = p1_fill = p2_fill = p3_fill = 255;
  circle1 = true;
  circle2 = circle3 = circle4 = false;
  score = 0;
  live = 3;

  // create random circle
  [x1, y1, rad1, xspeed1, yspeed1] = randomCircle(20);
  [x2, y2, rad2, xspeed2, yspeed2] = randomCircle(30);
  [x3, y3, rad3, xspeed3, yspeed3] = randomCircle(40);
  [x4, y4, rad4, xspeed4, yspeed4] = randomCircle(50);
}
// NEWSHAPES
function newShapes() {
  function createRandomShape(shapesSet) {
    let shape = random(shapesSet);
    let index = shapesSet.indexOf(shape);
    shapesSet.splice(index, 1);
    return shape;
  }

  // define original state of a new round
  shapeX = 310;
  shapeY = 310;
  showShape = 255;
  next = false;
  hover1_fill = hover2_fill = hover3_fill = hover4_fill = color("default");

  // store all of the shapes
  let shapes = [shape1, shape2, shape3, shape4, shape5, shape6, shape7, shape8];

  // avoid shapes duplication by creating temporary storage and remove any used shapes
  if (tempshapes.length === 0) {
    tempshapes = shapes.slice();
  }
  // create 4 non-duplicate random shapes
  randomShape1 = createRandomShape(tempshapes);
  randomShape2 = createRandomShape(tempshapes);
  randomShape3 = createRandomShape(tempshapes);
  randomShape4 = createRandomShape(tempshapes);

  // make the dragging one of the four random shape and assign with number based on position
  let randomShapes = [randomShape1, randomShape2, randomShape3, randomShape4];
  draggingShape = random(randomShapes);

  if (draggingShape == randomShape1) choice = 1;
  if (draggingShape == randomShape2) choice = 2;
  if (draggingShape == randomShape3) choice = 3;
  if (draggingShape == randomShape4) choice = 4;
}

// for typing game
function keyTyped() {
  function correct() {
    textSize(50);
    push();
    fill(14, 216, 14);
    textAlign(CENTER);
    text("Correct", width / 2, 195);
    pop();
    finalscore++;
    game1round++;
    bell.play();
  }

  function incorrect() {
    push();
    fill(255, 0, 0);
    text("Incorrect", 220, 195);
    pop();
    game1round++;
    buzzer.play();
  }

  function checkfinish() {
    if (game1round <= 10) {
      nextround = true;
      push();
      textSize(12);
      NextButton();
      pop();
    } else {
      replaygame1 = true;
      finish = true;
    }
  }

  if (wordLength === 5) {
    // positions for each letter
    let position = 165,
      change = 61;

    // final words
    contents += key;

    // typing words aligned with underlines. Change represent space
    textSize(40);
    if (letters === 0) {
      text(key, position, 315);
    }
    if (letters === 1) {
      text(key, position + change, 315);
    }
    if (letters === 2) {
      text(key, position + change * 2, 315);
    }
    if (letters === 3) {
      text(key, position + change * 3, 315);
    }
    if (letters === 4) {
      text(key, position + change * 4, 315);
    }
    letters++;
    if (contents == randomword && letters == 5) {
      correct();
      checkfinish();
    } else if (contents != randomword && letters == 5) {
      incorrect();
      checkfinish();
    }
  } else if (wordLength == 4) {
    let position = 191,
      change = 63;
    contents += key;
    textSize(40);
    if (letters === 0) {
      text(key, position, 315);
    }
    if (letters === 1) {
      text(key, position + change, 315);
    }
    if (letters === 2) {
      text(key, position + change * 2, 315);
    }
    if (letters === 3) {
      text(key, position + change * 3, 315);
    }
    letters++;
    if (contents == randomword && letters == 4) {
      correct();
      checkfinish();
    }
    if (contents != randomword && letters == 4) {
      incorrect();
      checkfinish();
    }
  }
}

// TYPING GAME SETUP
function typingGame() {
  enableClick = false;
  background(220);
  BackButton();

  // words, round and letters' lines
  push();
  textAlign(CENTER);
  rectMode(CENTER);
  textFont("Arial", 30);
  text("Round " + game1round, width / 2, 55);
  rect(width / 2, 114, 200, 75);
  textFont("Arial", 45);
  text(randomword, width / 2, 125);
  strokeWeight(1);
  if (wordLength === 5) {
    line(155, 320, 205, 320);
    line(215, 320, 265, 320);
    line(275, 320, 325, 320);
    line(335, 320, 385, 320);
    line(395, 320, 445, 320);
  }
  if (wordLength === 4) {
    line(185, 320, 235, 320);
    line(245, 320, 295, 320);
    line(305, 320, 355, 320);
    line(365, 320, 415, 320);
  }
  pop();
  // score updated on upper right
  textSize(20);
  text("Score: " + finalscore + "/10", 480, 50);
}

// TAPPING GAME SETUP
function tappingGame() {
  function drawCircle(x, y, rad, hover) {
    push();
    stroke(220);
    fill(hover);
    ellipse(x, y, rad * 2, rad * 2);
    pop();
  }
  function movingCircle(x, y, xspeed, yspeed, rad) {
    x += xspeed;
    y += yspeed;
    if (x > width - rad || x < rad) {
      xspeed = -xspeed;
    }
    if (y > height - rad || y < rad) {
      yspeed = -yspeed;
    }
    return [x, y, xspeed, yspeed];
  }

  drawCircle(x1, y1, rad1, o1_fill);
  drawCircle(x2, y2, rad2, o2_fill);
  drawCircle(x3, y3, rad3, o3_fill);
  drawCircle(x4, y4, rad4, o4_fill);

  background(220);
  noCursor();
  BackButton();
  textSize(20);
  text("Score: " + finalscore + "/10", 480, 35);
  text("Live: " + live + "/3", 480, 60);
  textSize(30);
  text("Round: " + game2round, 250, 50);

  // update circle coordination to enable moving and bouncing
  [x1, y1, xspeed1, yspeed1] = movingCircle(x1, y1, xspeed1, yspeed1, rad1);
  [x2, y2, xspeed2, yspeed2] = movingCircle(x2, y2, xspeed2, yspeed2, rad2);
  [x3, y3, xspeed3, yspeed3] = movingCircle(x3, y3, xspeed3, yspeed3, rad3);
  [x4, y4, xspeed4, yspeed4] = movingCircle(x4, y4, xspeed4, yspeed4, rad4);

  // turn circle to planet
  push();
  imageMode(CENTER);
  tint(255, p_fill);
  image(planet, x1, y1, rad1 * 2 + 2, rad1 * 2 + 2);
  tint(255, p1_fill);
  image(planet, x2, y2, rad2 * 2 + 2, rad2 * 2 + 2);
  tint(255, p2_fill);
  image(planet, x3, y3, rad3 * 2 + 2, rad3 * 2 + 2);
  tint(255, p3_fill);
  image(planet, x4, y4, rad4 * 2 + 2, rad4 * 2 + 2);
  pop();
  // enable ship to move with cursor
  image(shipImg, mouseX - 50, mouseY, shipImg.width / 6, shipImg.height / 6);
}

// MATCHING GAME SETUP
function matchingGame() {
  function drawBox(x1, y1, x2, y2, hover) {
    push();
    strokeWeight(2);
    push();
    fill(hover);
    rect(x1, y1, x2, y2);
    pop();
    return [x1, y1, x2, y2];
  }

  game1 = game2 = false;
  background(220);
  BackButton();
  textSize(20);
  text("Score: " + finalscore + "/10", 480, 50);
  push();
  textAlign(CENTER);
  textFont("Arial", 30);
  text("Round " + game3round, width / 2 + 10, 55);
  if (finalscore == 10) {
    replaygame3 = true;
    finish = true;
  }
  pop();

  // draw boxes that contain shapes
  box1 = drawBox(51, 90, 127, 125, hover1_fill);
  box2 = drawBox(178, 90, 127, 125, hover2_fill);
  box3 = drawBox(305, 90, 127, 125, hover3_fill);
  box4 = drawBox(430, 90, 127, 125, hover4_fill);

  // change bg color when mouse over box
  if (mouseOnObj(box1, 8)) {
    hover1_fill = color(200);
  } else if (mouseOnObj(box2, 8)) {
    hover2_fill = color(200);
  } else if (mouseOnObj(box3, 8)) {
    hover3_fill = color(200);
  } else if (mouseOnObj(box4, 8)) {
    hover4_fill = color(200);
  } else
    hover1_fill = hover2_fill = hover3_fill = hover4_fill = color("default");

  // put shapes on boxes
  image(randomShape1, 55, 120);
  image(randomShape2, 180, 120);
  image(randomShape3, 307, 120);
  image(randomShape4, 433, 120);

  // shape to drag
  push();
  tint(255, showShape);
  // make sure cursor locate at center of image
  imageMode(CENTER);
  image(draggingShape, shapeX, shapeY);
  pop();
}

function draw() {
  if (game2 == true) {
    tappingGame();
  }
  if (game3 == true) {
    matchingGame();
  }
  endScreen();
  //Cursor change project
  //define area for pointer cursor
  // if (((mouseX >= 70 && mouseX <= 210 && mouseY >= 250 && mouseY <= 320 ) ||
  //     (mouseX >= 390 && mouseX <= 530 && mouseY >= 250 && mouseY <= 320) ||
  //     (mouseX >= 230 && mouseX <= 370 && mouseY >= 250 && mouseY <= 320) ||
  //     (mouseX >= 265 && mouseX <= 335 && mouseY >= 357 && mouseY <= 387) ||
  //     (mouseX >= 10 && mouseX <= 50 && mouseY >= 20 && mouseY <= 60))&& enableClick) {
  //     cursor("pointer");
  // } else cursor("default");
}

// INSTRUCTION BOXES AND PAGES
function instruction() {
  if (mouseOnObj(inbox1, 0) && enableClick) {
    enableClick = false;
    background(220);
    BackButton();
    image(type1, 80, 70, type1.width / 5, type1.height / 5);
    image(type2, 300, 70, type2.width / 5, type2.height / 5);
    image(type3, 80, 220, type3.width / 5, type3.height / 5);
    text("- Type the word from the box", 305, 240);
    text("using keyboard.", 305, 260);
    text("- If you type the right word,", 305, 280);
    text(" you get 1 point.", 305, 300);
    text("- If you type the wrong word,", 305, 320);
    text(" you get 0 point.", 305, 340);
    text("- There are 10 rounds. Good luck!", 305, 360);
  }
  if (mouseOnObj(inbox2, 0) && enableClick) {
    enableClick = false;
    background(220);
    BackButton();
    image(tap1, 80, 70, tap1.width / 5, tap1.height / 5);
    image(tap5, 300, 70, tap5.width / 5, tap5.height / 5);
    image(tap2, 80, 220, tap2.width / 5, tap2.height / 5);
    text("- Shoot the meteors from smallest", 305, 240);
    text("to biggest by clicking the mouse.", 305, 260);
    text("- If you shot all of them,", 305, 280);
    text(" you get 1 point.", 305, 300);
    text("- If you miss, you lose 1 live,", 305, 320);
    text(" lose 3 and you get 0 point.", 305, 340);
    text("- There are 10 rounds. Good luck!", 305, 360);
  }
  if (mouseOnObj(inbox3, 0) && enableClick) {
    enableClick = false;
    background(220);
    BackButton();
    image(match1, 80, 70, match1.width / 5, match1.height / 5);
    image(match2, 300, 70, match2.width / 3.47, match2.height / 3.47);
    image(match3, 80, 220, match3.width / 3.47, match3.height / 3.47);
    text("- Drag the right shape to the box", 305, 240);
    text("by holding the mouse then release.", 305, 260);
    text("- If you drop at the right box,", 305, 280);
    text(" you get 1 point.", 305, 300);
    text("- If you drop at wrong box,", 305, 320);
    text(" you get 0 point.", 305, 340);
    text("- There are 10 rounds. Good luck!", 305, 360);
  }
}

//GAME FEEDBACK
function creditScreen() {
  // CREDITS
  if (mouseOnObj(crebox, 0) && enableClick) {
    enableClick = false;
    background(220);
    BackButton();
    rect(50, 80, 500, 300);
    textSize(23);
    text("Our Mission: ", 53, 105);
    textSize(19);
    text(
      "Mini Me Motors is developed to help children to get used to",
      53,
      130
    );
    text("mouse and keyboard when interacting with computers", 53, 150);
    text(
      "by learning how to type (typing game), click(tapping game), ",
      53,
      170
    );
    text("and drag/drop (matching game)", 53, 190);
    textSize(23);
    text("Our Team: ", 53, 225);
    textSize(19);
    text("Project Manager: Tuan Kiet Nguyen", 53, 250);
    text("Design Lead: Isabelle Merchant", 53, 270);
    text("Head of Documentation: Sam Westwood", 53, 290);
    text("Lead Programmer: Alexander Witt", 53, 310);
    textSize(23);
    text("Contact Us: ", 53, 345);
    textSize(19);
    alink.show();
  }
}

// MOUSE PRESSING INTERACTION (mostly for game 2 to destroy button and game3 to enable dragging)
function mousePressed() {
  function winstatus() {
    exploded.play();
    score++;
    live++;
  }
  function checkfinish() {
    if (score == 4 || live <= 0) {
      game2round++;
      if (live > 0) {
        finalscore++;
      }
      if (game2round == 11) {
        replaygame2 = true;
        finish = true;
      }
      newCircles();
      tappingGame();
    }
  }
  // Check if mouse is inside the circle
  if (game2 == true) {
    shoot.play();
    let d1 = dist(mouseX, mouseY, x1, y1),
      d2 = dist(mouseX, mouseY, x2, y2),
      d3 = dist(mouseX, mouseY, x3, y3),
      d4 = dist(mouseX, mouseY, x4, y4);

    if (d1 < rad1 && circle1) {
      circle1 = false;
      circle2 = true;
      o1_fill = color(220);
      p_fill = 0;
      winstatus();
    }
    if (d2 < rad2 && circle2) {
      circle2 = false;
      circle3 = true;
      o2_fill = color(220);
      p1_fill = 0;
      winstatus();
    }
    if (d3 < rad3 && circle3) {
      circle3 = false;
      circle4 = true;
      o3_fill = color(220);
      p2_fill = 0;
      winstatus();
    }
    if (d4 < rad4 && circle4) {
      circle4 = false;
      o4_fill = color(220);
      p3_fill = 0;
      winstatus();
    } else {
      live--;
    }
    // back button and replay button does not count as miss
    if (mouseOnObj(backbox, 0) || mouseOnObj(replaybox, 0)) {
      live++;
      shoot.stop();
    }

    checkfinish();
  }

  // if mouse is pressed, confirm shape can be moved
  if (game3 == true) {
    let d = dist(mouseX, mouseY, shapeX, shapeY);
    if (d < draggingShape.width / 2) {
      shapeMove = true;
    } else {
      shapeMove = false;
    }
  }
}

// MOUSE CLICKING FUNCTION (for boxes and buttons)
function mouseClicked() {
  // TYPING GAME NAVIGATION
  if (mouseOnObj(typebox, 0) && enableClick) {
    enableClick = false;
    game2 = false;
    game3 = false;
    typingGame();
  }

  // TAPPING GAME NAVIGATION
  else if (mouseOnObj(tapbox, 0) && enableClick) {
    enableClick = false;
    game2 = true;
    game3 = false;
  }

  // MATCHING GAME NAVIGATION
  else if (mouseOnObj(matchbox, 0) && enableClick) {
    enableClick = false;
    game2 = false;
    game3 = true;
  }

  // GO BACK BUTTON
  if (mouseOnObj(backbox, 0)) {
    cursor();
    alink.hide();
    enableClick = false;
    finish = false;
    strokeWeight(0);
    game2 = false;
    game3 = false;
    game1round = 1;
    game2round = 1;
    game3round = 1;
    finalscore = 0;
    mainMenu();
  }
  if (mouseOnObj(nextbox, 0) && nextround == true) {
    enableClick = false;
    nextround = false;
    next = false;
    letters = 0;
    contents = "";
    randomword = "";
    wordLength = "";
    newWords();
    typingGame();
  }

  // INSTRUCTION BOX CLICKED
  instruction();

  // CREDIT BOX CLICKED
  creditScreen();

  // REPLAY BUTTON CLICKED
  replayGame();
}

function replayGame() {
  if (mouseOnObj(replaybox, 0) && finish == true) {
    enableClick = false;
    finish = false;
    finalscore = 0;
    if (replaygame1 == true) {
      game1 = true;
      mainMenu();
      typingGame();
    } else if (replaygame2 == true) {
      game2 = true;
      //live++;
      tappingGame();
    } else if (replaygame3 == true) {
      game3 = true;
      cursor();
      matchingGame();
    }
  }
}

function endScreen() {
  if (finish == true) {
    enableClick = false;
    nextround = false;
    cursor();
    game1round = 1;
    game2round = 1;
    game3round = 1;
    textSize(50);
    background(220);
    BackButton();
    ReplayButton();
    if (finalscore >= 0 && finalscore <= 5) {
      text("At least you tried^^", 105, 100);
      image(star, 250, 130, star.width / 5, star.height / 5);
      text(finalscore + " /10", 255, 290);
    } else if (finalscore > 5 && finalscore <= 7) {
      text("Congratulations", 135, 100, 100, 100);
      image(star, 190, 150, star.width / 5, star.height / 5);
      image(star, 350, 150, star.width / 5, star.height / 5);
      text(finalscore + " /10", 255, 300);
    } else if ((finalscore) => 8 && finalscore <= 10) {
      text("Perfect!!!", 210, 100, 100, 100);
      image(star, 130, 150, star.width / 5, star.height / 5);
      image(star, 250, 150, star.width / 5, star.height / 5);
      image(star, 380, 150, star.width / 5, star.height / 5);
      if (finalscore == 10) text(finalscore + " /10", 235, 300);
      else text(finalscore + " /10", 255, 300);
    }
  }
}

// MOUSE RELEASING FUNCTION (mostly for game 3 to drop shape)
function mouseReleased() {
  function correct() {
    //hover1_fill = color("#047904");
    bell.play();
    finalscore++;
    showShape = 0;
    next = true;
  }

  function incorrect() {
    buzzer.play();
    //hover1_fill = color("#DD0200");
    showShape = 0;
    next = true;
  }
  shapeMove = false;
  if (!game2 && game3) {
    enableClick = false;

    if (choice == 1) {
      if (mouseOnObj(box1, 5)) {
        correct();
      } else if (
        mouseOnObj(box2, 5) ||
        mouseOnObj(box3, 5) ||
        mouseOnObj(box4, 5)
      ) {
        incorrect();
      }
    }
    if (choice == 2) {
      if (mouseOnObj(box2, 5)) {
        correct();
      } else if (
        mouseOnObj(box1, 5) ||
        mouseOnObj(box3, 5) ||
        mouseOnObj(box4, 5)
      ) {
        incorrect();
      }
    }
    if (choice == 3) {
      if (mouseOnObj(box3, 5)) {
        correct();
      } else if (
        mouseOnObj(box1, 5) ||
        mouseOnObj(box2, 5) ||
        mouseOnObj(box4, 5)
      ) {
        incorrect();
      }
    }
    if (choice == 4) {
      if (mouseOnObj(box4, 5)) {
        correct();
      } else if (
        mouseOnObj(box1, 5) ||
        mouseOnObj(box2, 5) ||
        mouseOnObj(box3, 5)
      ) {
        incorrect();
      }
    }
    // return default position if release unwanted area
    else {
      shapeX = 310;
      shapeY = 310;
    }
    if (next == true) {
      game3round++;
      if (game3round == 11) {
        finish = true;
      }
      newShapes();
      matchingGame();
    }
  }
}

// MOUSE DRAGGING FUNCTION (for game 3 to drag shape)
function mouseDragged() {
  if (shapeMove) {
    shapeX = mouseX;
    shapeY = mouseY;
  }
}
