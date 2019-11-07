function Creature(x, y, dna = null, score = 0) {
  this.position = createVector(x, y);
  this.vel = createVector(random(-5, 5), random(-5, 5));
  // this.vel = createVector(-4, 0);
  this.acc = createVector(0, 0);
  this.score = score;
  this.tail = [];
  this.tailSize = 8;

  if (dna == null) {
    this.dna = [];
    // attraction to food
    this.dna[0] = random(0, 5);
    // avoiding poison
    this.dna[1] = random(-3, 3);
    // dying speed
    this.dna[2] = random(-0.02, 0.05);
    // max life
    this.dna[3] = random(90, 130);
    // food perception
    this.dna[4] = random(10, 100);
    // poison perception
    this.dna[5] = random(10, 100);
    // ability to reproduce
    this.dna[6] = random(0.00001, 0.0005);
    // max speed
    this.dna[7] = random(5, 12);
    // max force
    this.dna[8] = random(0.15, 0.35);
    // main size
    this.dna[9] = floor(random(8, 12));
  } else {
    this.dna = dna;
  }

  this.color = color(
    map(this.dna[2], -0.02, 0.05, 0, 255), // dying speed
    map(this.dna[0], 0, 5, 0, 255), // attraction to food
    map(this.dna[1], -3, 3, 0, 255) // avoiding poison
    // ,map(this.dna[7], 5, 12, 0, 255) // max speed
  );
  this.life = this.dna[3] / 2;
  this.r = this.dna[9];
  this.wingSize = this.dna[9];

  this.update = function(i) {
    if (
      !(
        this.position.x < width - spaceLimit &&
        this.position.x > spaceLimit &&
        this.position.y < height - spaceLimit &&
        this.position.y > spaceLimit
      )
    ) {
      var limit = 100;
      var backToCenter = this.seek(
        createVector(
          floor(random(limit, width - limit)),
          floor(random(limit, height - limit))
        )
      );
      this.applyForce(backToCenter);
    }

    this.tail.push(this.position.copy());
    if (this.tail.length > this.tailSize) {
      this.tail.splice(0, 1);
    }

    this.vel.add(this.acc);
    this.vel.limit(this.dna[7]);
    this.position.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.eat = function(list, perception) {
    var minDist = Infinity;
    var index = -1;
    for (var i = 0; i < list.length; i++) {
      var dist = this.position.dist(list[i]);
      if (dist < minDist && dist < perception) {
        index = i;
        minDist = dist;
      }
      // minDist = Math.min(minDist, dist);
    }

    if (index != -1) {
      if (minDist < this.r) {
        this.life = this.life + list[index].nutrition;
        this.life = constrain(this.life, 0, this.dna[3]);
        this.score += list[index].nutrition > 0 ? 1 : -1;
        list.splice(index, 1);
      } else {
        return this.seek(list[index]);
      }
    }
    return createVector(0, 0);
  };

  this.evolve = function() {
    var hasEvoled = false;
    if (this.score % 30 == 0) {
      this.tailSize++;
      hasEvoled = true;
    }
    if (this.score % 50 == 0) {
      this.r += 0.2;
      this.wingSize += 0.5;
      hasEvoled = true;
    }

    if (hasEvoled) {
      this.score++;
    }
  };

  this.seek = function(target) {
    var desired = target.copy().sub(this.position);
    desired.setMag(this.dna[7]);

    var steer = desired.copy().sub(this.vel);
    steer.limit(this.dna[8]);
    return steer;
  };

  this.behaviors = function(good, bad) {
    var steerG = this.eat(good, this.dna[4]);
    var steerB = this.eat(bad, this.dna[5]);

    steerG.mult(this.dna[0]);
    steerB.mult(-this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  };

  this.die = function() {
    if (this.life > 0) {
      this.life -= 0.1 + this.dna[2];
      return false;
    } else {
      return true;
    }
  };

  this.reproduce = function(succeed = false) {
    if (random() < this.dna[6] || succeed) {
      var mutatedDna = [];
      for (var d = 0; d < this.dna.length; d++) {
        mutatedDna[d] = this.dna[d] * random(0.9, 1.1);
      }
      this.life = this.life / 2;
      return new Creature(
        this.position.x,
        this.position.y,
        mutatedDna
        //this.score
      );
    }
    return undefined;
  };

  this.randomTenPercent = function(value) {};

  this.display = function() {
    let theta = this.vel.heading() + PI / 2;
    push();

    // tail
    fill(this.color);
    ellipseMode(CENTER);
    var n = this.tail.length - 1;
    for (var i = n; i > 0; i--) {
      ellipse(this.tail[i].x, this.tail[i].y, this.r / (n / i));
    }

    translate(this.position.x, this.position.y);
    rotate(theta);

    var lifeColor = lerpColor(red, green, this.life / this.dna[3]);
    fill(lifeColor);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(this.r / 2.5, -this.r * 2);
    vertex(this.r / 1.5, -this.r);
    vertex(this.r * 1.3, -this.r / 2.5);
    vertex(this.r / 1.1, -this.r / 2);
    vertex(this.r * 1.6, this.r / 1.8);
    vertex(this.r / 1.3, 0);
    vertex(this.r / 2, this.r / 2);
    vertex(-this.r / 2, this.r / 2);
    vertex(-this.r / 1.3, 0);
    vertex(-this.r * 1.6, this.r / 1.8);
    vertex(-this.r / 1.1, -this.r / 2);
    vertex(-this.r * 1.3, -this.r / 2.5);
    vertex(-this.r / 1.5, -this.r);
    vertex(-this.r / 2.5, -this.r * 2);
    endShape(CLOSE);

    //eye right
    stroke(0);
    fill(255, 200, 0);
    beginShape();
    vertex(this.r / 2.3, -this.r);
    vertex(this.r / 1.2, -this.r / 2);
    vertex(this.r / 2.0, -this.r / 3.2);
    endShape(CLOSE);
    // eye left
    stroke(0);
    fill(255, 200, 0);
    beginShape();
    vertex(-this.r / 2.3, -this.r);
    vertex(-this.r / 1.2, -this.r / 2);
    vertex(-this.r / 2.0, -this.r / 3.2);
    endShape(CLOSE);

    if (wings) {
      //wings
      fill(this.color);
      beginShape();
      vertex(this.r / 1.8, this.r);
      vertex(this.wingSize, this.r * 1.3);
      vertex(this.wingSize * 2, this.r / 1.5);
      vertex(this.wingSize * 2.5, this.r / 1.2);
      vertex(this.wingSize * 3.5, this.r * 2);
      vertex(this.wingSize * 2.4, this.r * 1.1);
      vertex(this.wingSize * 2.8, this.r * 2.4);
      vertex(this.wingSize * 2.2, this.r * 1.0);
      vertex(this.wingSize * 2.0, this.r * 2.5);
      vertex(this.wingSize * 2.0, this.r * 1.1);
      vertex(this.wingSize * 1.3, this.r * 2.0);
      vertex(this.wingSize * 1.9, this.r * 1.0);
      vertex(this.wingSize, this.r * 1.4);
      vertex(this.r / 1.8, this.r * 1.2);
      endShape(CLOSE);
      beginShape();
      vertex(-this.r / 1.8, this.r);
      vertex(-this.wingSize, this.r * 1.3);
      vertex(-this.wingSize * 2, this.r / 1.5);
      vertex(-this.wingSize * 2.5, this.r / 1.2);
      vertex(-this.wingSize * 3.5, this.r * 2);
      vertex(-this.wingSize * 2.4, this.r * 1.1);
      vertex(-this.wingSize * 2.8, this.r * 2.4);
      vertex(-this.wingSize * 2.2, this.r * 1.0);
      vertex(-this.wingSize * 2.0, this.r * 2.5);
      vertex(-this.wingSize * 2.0, this.r * 1.1);
      vertex(-this.wingSize * 1.3, this.r * 2.0);
      vertex(-this.wingSize * 1.9, this.r * 1.0);
      vertex(-this.wingSize, this.r * 1.4);
      vertex(-this.r / 1.8, this.r * 1.2);
      endShape(CLOSE);
    }
    if (debug) {
      this.debugInfo(lifeColor);
    }
    pop();
  };

  this.highlight = function() {
    translate(this.position.x, this.position.y);
    noFill();
    stroke(255);
    strokeWeight(4);
    ellipse(0, 0, 100);
  };

  this.debugInfo = function(lifeColor) {
    noFill();

    strokeWeight(3);
    // max life
    stroke(255, 255, 0);
    line(0, 0, this.dna[3] / 2, 0);
    // life
    stroke(lifeColor);
    line(0, 0, this.life / 2, 0);

    strokeWeight(1);
    // dying speed this.dna[2]
    // food perception this.dna[4]
    // ability to reproduce this.dna[6]

    stroke(0, 255, 0);
    // attraction to food
    line(0, 0, 0, this.dna[0] * -10);
    // food perception
    ellipse(0, 0, this.dna[4] * 2);

    stroke(255, 0, 0);
    // avoiding poison
    line(0, 0, 0, this.dna[1] * 10);
    // poison perception
    ellipse(0, 0, this.dna[5] * 2);

    stroke(0, 0, 255);
    // // max speed
    // line(1, 0, 1, this.dna[7] * -8);
    // // max force
    // ellipse(0, 0, this.dna[8] * 100);
    // taille
    ellipse(0, 0, this.r * 2);
  };
}
