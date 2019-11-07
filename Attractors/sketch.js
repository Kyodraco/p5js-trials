let particles = [];
let attractors = [];
let G = 120;
let VEL_LIMIT = 12;
let DIST_LIMIT = 20;
let MAX_ACC = 30;
let radius = 280;
let nbAttractors = 5;
let nbParticles = 500;
let showAttractors = false;

let counter = 0;
let action = "";

let promiseSong, promiseLyrics, promiseFont, promiseImg;
let currentConfig;
let song;
let songFile;
let lyricsFile;
let backgroundImg;

function preload() {
  promiseSong = loadSound("../assets/sounds/RunningWild.mp3");
  promiseLyrics = loadJSON("../assets/json/lyrics.json");
  promiseFont = loadFont("../assets/fonts/BreatheFire.otf");
  promiseImg = loadImage("../assets/images/WolfLand.jpg");
  loadJSON("config.json", function(file) {
    console.log(file.config);
    currentConfig = file.config[1];
    G = currentConfig.G;
    VEL_LIMIT = currentConfig.VEL_LIMIT;
    DIST_LIMIT = currentConfig.DIST_LIMIT;
    MAX_ACC = currentConfig.MAX_ACC;
    radius = currentConfig.radius;
    nbAttractors = currentConfig.nbAttractors;
    nbParticles = currentConfig.nbParticles;
    showAttractors = currentConfig.showAttractors;
  });
}

/*
éclair
aurore boréale
tempête de neige
feu
pluie

image de fond

dévoiler les mots au fur et à mesure
texte emporté par le vent
texte enflammé

zoom/dezoom sur texte dans l'espace
*/

function setup() {
  createCanvas(windowWidth, windowHeight);

  var startingPointX = width / 2;
  var startingPointY = height / 2;

  attractors.push(createVector(width / 2, height / 2));
  for (var p = 0; p < nbParticles; p++) {
    var r = 200;
    var g = 200;
    var b = random(200, 255);
    var pColor = color(r, g, b);
    //particles.push(new Particle(startingPointX, startingPointY, pColor));
    //particles.push(new Particle(random(width), random(height), pColor));
    particles.push(
      new Particle(
        random(-width, 2 * width),
        random(-height, 2 * height),
        pColor
      )
    );
  }

  textSize(50);
  textAlign(CENTER, CENTER);
  let promises = [promiseSong, promiseLyrics, promiseFont, promiseImg];
  Promise.all(promises)
    .then(results => {
      console.log("files are ready", results);
      this.songFile = results[0];
      this.lyricsFile = results[1];

      if (results[2] != undefined) {
        textFont(results[2]);
      }
      if (results[3] != undefined) {
        backgroundImg = results[3];
      }

      this.song = new Song(180, this.lyricsFile, this.songFile);
      this.ready = true;

      background(backgroundImg);
    })
    .catch(errors => {
      console.error(errors);
    });
}

function initAttractors(nbAttr) {
  attractors = [];
  attractors.push(createVector(width / 2, height / 2));
  for (var a = 0; a < nbAttr; a++) {
    var angle = (TWO_PI * a) / nbAttr;
    var newX = width / 2 + radius * cos(angle);
    var newY = height / 2 + radius * sin(angle);
    attractors.push(createVector(newX, newY));
  }
  nbAttractors = nbAttr;
}

function mousePressed() {
  //attractors.push(createVector(mouseX, mouseY));
}

function keyPressed() {
  if (this.ready) {
    if (keyCode == RETURN) {
      if (this.song.isPlaying()) {
        this.song.pause();
      } else {
        this.song.play();
      }
    }

    if (keyCode == BACKSPACE) {
      this.song.stop();
    }
  }
}

function setAttractorsOnText(text) {
  var txtLength = (text.length * textSize()) / 2.5;
  var nbAttr = floor(txtLength / ((7 / 2) * textSize()));
  if (nbAttr == 0) {
    nbAttr = 1;
  }

  if (nbAttractors != nbAttr) {
    radius = constrain(txtLength / 2, 0, height / 4);
    console.log(nbAttr);
    initAttractors(nbAttr);
  }
}

function varyAcceleration(counter) {
  MAX_ACC = map(cos(counter / 50), -1, 1, 20, 40);
}

function setParticlesColor(r1, r2, g1, g2, b1, b2) {
  for (var p = 0; p < nbParticles; p++) {
    var r = random(r1, r2);
    var g = random(g1, g2);
    var b = random(b1, b2);
    var pColor = color(r, g, b);
    particles[p].color = pColor;
  }
}

function setParticlesEffect(lyric) {
  switch (lyric.partType) {
    case "intro":
      if (action != "intro") {
        setParticlesColor(200, 200, 200, 200, 200, 255);
        G = (currentConfig.G * 4) / 3;
        action = "intro";
      }
      break;
    case "couplet":
      setAttractorsOnText(lyric.text);
      if (action != "couplet") {
        setParticlesColor(50, 100, 50, 180, 200, 200);
        G = currentConfig.G;
        action = "couplet";
      }
      break;
    case "pre-refrain":
      setAttractorsOnText(lyric.text);
      if (action != "pre-refrain") {
        setParticlesColor(50, 100, 100, 200, 255, 255);
        G = currentConfig.G / 3;
        action = "pre-refrain";
      }
      break;
    case "refrain":
      setAttractorsOnText(lyric.text);
      if (action != "refrain") {
        setParticlesColor(0, 100, 100, 200, 255, 255);
        G = currentConfig.G * 1.5;
        action = "refrain";
      }
      for (var p = 0; p < 10; p++) {
        particles.splice(0, 1);
        var pColor = color(random(0, 100), random(100, 200), 255);
        particles.push(new Particle(random(width), random(height), pColor));
      }
      break;
    case "pre-pont":
      if (action != "pre-pont") {
        G = currentConfig.G * 3;
        action = "pre-pont";
      }
      var r = map(cos(counter / 30), -1, 1, 100, 200);
      var g = map(sin(counter / 30), -1, 1, 100, 200);
      setParticlesColor(r, r, g, g, 200, 200);
      var newX = width / 2 + (width / 4) * cos(counter / 50);
      var newY =
        height / 2 + (height / 4) * cos(counter / 50) * sin(counter / 50);
      attractors = [createVector(newX, newY)];
      break;
    case "pont":
      setAttractorsOnText(lyric.text);
      if (action != "pont") {
        setParticlesColor(0, 100, 255, 255, 100, 250);
        G = currentConfig.G;
        action = "pont";
      }
      break;
    case "end-pont":
      setAttractorsOnText(lyric.text);
      if (action != "end-pont") {
        G = currentConfig.G * 4;
        action = "end-pont";
      }
      //G = map(cos(counter / 10),-1,1,currentConfig.G ,currentConfig.G * 4);
      var c = map(cos(counter / 20), -1, 1, 150, 250);
      setParticlesColor(c, c, c, c, c, c);
      var newX =
        width / 2 + (width / 4) * cos((PI / 4) * Math.floor(counter / 30));
      var newY = height / 2;
      //+ (height / 4) * sin((PI / 3) * Math.floor(counter / 40));
      attractors = [createVector(newX, newY)];
      //showAttractors = true;
      break;
    case "refrain-outro":
      setAttractorsOnText(lyric.text);
      if (action != "refrain-outro") {
        setParticlesColor(100, 200, 50, 100, 255, 255);
        G = currentConfig.G * 4;
        action = "refrain-outro";
      }
      for (var p = 0; p < 20; p++) {
        particles.splice(0, 1);
        var pColor = color(random(100, 200), random(50, 100), 255);
        particles.push(new Particle(random(width), random(height), pColor));
      }
      break;
    case "outro":
      if (action != "outro") {
        setParticlesColor(150, 200, 50, 50, 200, 250);
        G = 1;
        action = "outro";
      }
      break;
    default:
      setAttractorsOnText(lyric.text);
      break;
  }
}

function draw() {
  if (this.ready) {
    if (this.song.isPlaying()) {
      //background(backgroundImg);

      background(0, 0, 0, map(MAX_ACC, 20, 40, 30, 10));
      //background(0, 20);
      var lyric = this.song.currentLyric();

      varyAcceleration(counter);
      setParticlesEffect(lyric);

      strokeWeight(1);
      if (showAttractors) {
        for (var a = 0; a < attractors.length; a++) {
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

      fill(
        50,
        map(sin(counter / 40), -1, 1, 100, 150),
        map(cos(counter / 40), -1, 1, 220, 250)
      );
      stroke(0, 0, map(cos(counter / 40), -1, 1, 160, 200));
      text(lyric.text, width / 2, (height * 4) / 5);

      //image(drawingCanvas, 0, 0);
    } else {
      fill(
        50,
        map(sin(counter / 40), -1, 1, 100, 150),
        map(cos(counter / 40), -1, 1, 220, 250)
      );
      background(backgroundImg);
      stroke(0, 0, map(cos(counter / 40), -1, 1, 160, 200));
      text("Running Wild", width / 2, (height * 4) / 5);
    }
  }

  counter++;
}
