let particles = [];
let attractors = [];
let G = 500;
let VEL_LIMIT = 12;
let DIST_LIMIT = 20;
let MAX_ACC = 30;
let radius = 280;
let nbAttractors = 5;
let nbParticles = 100;
let showAttractors = true;

function setup() {
  createCanvas(600, 400, WEBGL);

  attractors.push(createVector(0, 0, 0, 0));
  for (var p = 0; p < nbParticles; p++) {
    var r = 0;
    var g = random(150, 255);
    var b = random(150, 255);
    var pColor = color(r, g, b);
    particles.push(
      new Particle(
        random(-width, width),
        random(-height, height),
        random(-width, width),
        pColor
      )
    );
  }
}

function draw() {
  background(0);
  translate(0, 0, -100)

  noStroke();
  if (showAttractors) {
    for (var a = 0; a < attractors.length; a++) {
      fill(50, 100, 250);
      ellipse(attractors[a].x, attractors[a].y, 10);
    }
  }

  for (var p = 0; p < particles.length; p++) {
    for (var a = 0; a < attractors.length; a++) {
      particles[p].attracted(attractors[a]);
    }
    particles[p].update();
    particles[p].show();
  }
}
