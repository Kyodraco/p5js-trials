var entities = [];
var balls = [];

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Events = Matter.Events,
  Body = Matter.Body,
  Bodies = Matter.Bodies;

var engine;
var ground;

var pad;
var score = 0;
var obstacleSize = 48;

var dingSound;
var crackSound;

var updateSpawnSpeedBtn, updatePriceBtn, updateObstacleBtn;

function preload() {
  dingSound = loadSound("sounds/ding.mp3");
  crackSound = loadSound("sounds/crack.wav");
}

function setup() {
  createCanvas(600, 600);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  Events.on(engine, "collisionStart", collision);

  pad = new Pad(30, 20, color(200, 100, 0), 1, 120);

  updateSpawnSpeedBtn = createButton("Speed");
  updateSpawnSpeedBtn.mousePressed(updateSpawnSpeed);
  updatePriceBtn = createButton("Price");
  updatePriceBtn.mousePressed(updatePrice);
  updateObstacleBtn = createButton("Obstacle");
  updateObstacleBtn.mousePressed(updateObstacle);

  level1();
}

function updateSpawnSpeed(){
	pad.updateSpawnSpeed()
}
function updatePrice(){
	pad.updatePrice()
}
function updateObstacle(){
	if(obstacleSize > 10){
		obstacleSize --;
		entities.forEach(entity => {
			if(entity.body.isFixed !== true){
				entity.changeSize(obstacleSize);
			}
		});

		console.log("new size : " + obstacleSize);
	}
}

function collision(event) {
  var pairs = event.pairs;
  var combinationLabel = pairs[0].bodyA.label + "|" + pairs[0].bodyB.label;

  switch (combinationLabel) {
    case "ball|circle":
    case "circle|ball":
		// console.log("ding !");
		//dingSound.play();
      break;
  }
}

function level1() {
  var lineOption = {
	isStatic: true,
	isFixed: true,
    friction: 0,
    displayOptions: {
      color: color(0, 100, 150),
      noStroke: true
    }
  };

  var parts = [
    new Line(0, height / 2, height, PI / 2, lineOption),
    new Line(width - 1, height / 2, height, PI / 2, lineOption)
  ];

  var cols = 8;
  var rows = 9;
  var startAtY = 80;
  var spacing = width / cols;
  for (var i = 0; i < rows; i++) {
    var offset = i % 2 == 0 ? spacing / 2 : 0;
    for (var j = 0; j < cols + 1; j++) {
      if (j == cols && i % 2 == 0) {
        continue;
      }
      parts.push(
        new Circle(offset + j * spacing, startAtY + (i * spacing) / 1.5, obstacleSize, {
          isStatic: true,
		  isFixed: false,
          friction: 0,
          displayOptions: {
            color: color(0, 150, 200),
            strokeColor: color(255)
          }
        })
      );
    }
  }
  parts.forEach(element => {
    entities.push(element);
  });
  console.log(parts);
}

function mousePressed() {}

function randomColor() {
  return color(random(255), random(255), random(255));
}

function draw() {
  background(120);
  Engine.update(engine, 1000 / 60);
  rectMode(CENTER);
  ellipseMode(CENTER);

  for (var i = entities.length - 1; i >= 0; i--) {
    var element = entities[i];
    element.show();
  }
  for (var i = balls.length - 1; i >= 0; i--) {
    var ball = balls[i];
    if (ball.isOutOfScreen()) {
      ball.die(1);
      balls.splice(i, 1);
    } else {
      ball.show();
    }
  }

  pad.live();
}
