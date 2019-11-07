let green, red;

let creatures;
let food;
let poison;
let spaceLimit = 20;
let debug, effect, wings;
let bestOne;
let bestOnes;
let highlightCounter;
let overPopulation = 200;

let saveFileJson;

function preload() {
  saveFileJson = loadJSON("bests.json");
}

function setup() {
  // createCanvas(1200, 800);
  createCanvas(windowWidth - 40, windowHeight - 40);
  green = color(0, 255, 0);
  red = color(200, 0, 0);
  creatures = [];
  food = [];
  poison = [];
  for (var i = 0; i < 200; i++) {
    createFood();
  }
  for (var i = 0; i < 50; i++) {
    createPoison();
  }

  // creatures.push(new Creature(random(0, width), random(0, height),
  // [
  //   // this.dna[0] = random(0, 5);
  //   // this.dna[1] = random(-3, 3);
  //   // this.dna[2] = random(-0.02, 0.05);
  //   // this.dna[3] = random(90, 130);
  //   // this.dna[4] = random(10, 100);
  //   // this.dna[5] = random(10, 100);
  //   // this.dna[6] = random(0.00001, 0.0005);
  //   // this.dna[7] = random(5, 12);
  //   // this.dna[8] = random(0.15, 0.35);
  //   // this.dna[9] = floor(random(8, 12));

  //   // attraction to food
  //   4.94,
  //   // avoiding poison
  //   1.39,
  //   // dying speed
  //   0.010,
  //   // max life
  //   120.0,
  //   // food perception
  //   95.7,
  //   // poison perception
  //   39.5,
  //   // ability to reproduce
  //   0.000001,
  //   // max speed
  //   5.240629622122347,
  //   // max force
  //   0.35,
  //   // main size
  //   8
  // ]));

  creatures.push(new Creature(random(0, width), random(0, height)));
  for (var c = 0; c < 20; c++) {
    creatures.push(new Creature(random(0, width), random(0, height)));

    // var newCreature = creatures[c].reproduce(true);
    // newCreature.position.x = random(0, width);
    // newCreature.position.y = random(0, height);
    // creatures.push(newCreature);
  }
  bestOnes = [];
  bestOne = {
    dna: [],
    score: 0
  };
  highlightCounter = 0;
  debug = creatures < 20;
  effect = false;
  wings = true;
  console.log(creatures);
}

function keyPressed() {
  if (keyCode == RETURN) {
    console.log(bestOne);
    highlightCounter = 200;
  }
  if (keyCode == ESCAPE) {
    creatures.push(new Creature(random(0, width), random(0, height)));
    draw();
    loop();
  }
}

function keyTyped() {
  if (key >= "0" && key <= "9") {
    console.log(creatures[key]);
  }
  if (key == "d") {
    debug =! debug;
    console.log("debug", debug);
  }
  if (key == "e") {
    effect= !effect;
    console.log("effect", effect);
  }
  if (key == "w") {
    wings= !wings;
    console.log("wings", wings);
  }
  if (key == "s") { // spawn
    for (var c = 0; c < 20; c++) {
      creatures.push(new Creature(random(0, width), random(0, height)));
    }
    console.log("spawned new creatures");
  }
  if (key == "r") { // reproduce first
    // for (var c = 0; c < 5; c++) {
      var newCreature = creatures[0].reproduce(true);
      newCreature.position.x = random(0, width);
      newCreature.position.y = random(0, height);
      creatures.push(newCreature);
    // }
    console.log("reproduced first creature");
  }
  if (key == "k" && creatures.length > 0) { // kill last one
    creatures.splice(-1,1);
    console.log("killed last creature");
  }
}

function mousePressed() {
  for (var i = 0; i < 10; i++) {
    createFood();
  }
  createPoison();
}

function createFood(vector = null) {
  var newFood = vector == null ? randomVectorInSpace() : vector;
  newFood.nutrition = 5;
  food.push(newFood);
}
function createPoison(vector = null) {
  var newPoison = vector == null ? randomVectorInSpace() : vector;
  newPoison.nutrition = -10;
  poison.push(newPoison);
}

function randomVectorInSpace() {
  return createVector(random(0, width), random(0, height));
}

function draw() {
  if (effect) {
    background(0, 20);
  } else {
    background(0);
  }
  noFill();
  stroke(100);
  strokeWeight(1);
  rect(spaceLimit, spaceLimit, width - 2 * spaceLimit, height - 2 * spaceLimit);

  if (highlightCounter > 0) {
    highlightCounter--;
  }

  fill(0, 200, 0);
  noStroke();
  for (var i = 0; i < food.length; i++) {
    var cur = food[i];
    ellipse(cur.x, cur.y, 5, 5);
  }

  fill(255, 0, 0);
  for (var i = 0; i < poison.length; i++) {
    var cur = poison[i];
    rect(cur.x, cur.y, 5, 5);
  }

  for (var c = creatures.length - 1; c >= 0; c--) {
    var current = creatures[c];
    current.behaviors(food, poison);
    current.update(c);
    current.evolve();
    current.display();
    if (current.score > bestOne.score) {
      bestOne.dna = current.dna;
      bestOne.score = current.score;
      if (highlightCounter > 0) {
        current.highlight();
      }
    }
    if (current.die()) {
      createFood(current.position.copy());
      creatures.splice(c, 1);
    } else if (creatures.length < overPopulation && current.score > 50) {
      var newCreature = current.reproduce();
      if (newCreature != undefined) {
        creatures.push(newCreature);
      }
    }
  }

  if (creatures.length > 0) {
    if (random() < 0.08) {
      createFood();
    }
    if (random() < 0.005) {
      createPoison();
    }
  } else {
    console.log("no more creatures");
    if (bestOne.score > 100) {
      bestOnes.push({
        dna: bestOne.dna,
        score: bestOne.score
      });
    }
    bestOne = {
      dna: [],
      score: 0
    };
    console.log(bestOnes);
    noLoop();
  }
}
