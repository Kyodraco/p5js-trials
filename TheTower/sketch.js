let tower;
let emitters = [];
let bullets = [];
const PARTICLE_SIZE = 3;
const MAX_SPEED = 1;
const DEBUG = false;

function setup() {
  createCanvas(600, 600);
  // tower = new Tower(200, 200, 100);
}

function createParticleEmitter(x, y){
  emitters.push(new ParticleEmitter(
    x, y, PARTICLE_SIZE * 1.5,
    color(255),
    random(5,20)
    )
  )
}

function createTextEmitter(x, y, text){
  emitters.push(new TextEmitter(
    x, y, PARTICLE_SIZE * 1.5,
    color(255,0,0),
    30,
    text
    )
  )
}

function mousePressed(){
  bullets.push(new Bullet(
    createVector(mouseX, mouseY), 
    p5.Vector.random2D(), 
    6, 
    456));
}

function draw() {
  background(0);
  for(var emitter of emitters){
    // emitter.emit(5);
    emitter.show();
    emitter.update();

    if(emitter.isFinished()){
      emitters.splice(emitter, 1);
    }
  }

  for(var bullet of bullets){
    bullet.show();
    bullet.update();
  }

  bullets = bullets.filter(function(value, index, arr){
    if(value.isFinished){
      // createParticleEmitter(value.x, value.y)
      createTextEmitter(value.x, value.y, value.damages)
      return false;
    }
    return true
  })

  // ===========> DEBUG Info
  if(DEBUG){
    push()
    // fill(255)
    // text(Math.round(frameRate()), 20, 20)
    fill(
      map(round(frameRate()), 10, 60, 255, 0),
      map(round(frameRate()), 10, 60, 0, 255),
      0
    )
    rect(10,10, map(round(frameRate()), 10, 60, 10, 100), 20);
    pop()
  }
}
