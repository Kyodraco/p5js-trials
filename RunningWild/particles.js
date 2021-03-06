function Particle(x, y, z, color) {
  this.pos = createVector(x, y,z);
  this.previousPos = createVector(x, y, z);
  this.vel = p5.Vector.random3D();
  this.vel.mult(5);
  this.acc = createVector();
  this.color = color;

  this.show = function() {
    strokeWeight(1);
    stroke(this.color);
    //ellipse(this.pos.x, this.pos.y, 2);
    //ellipse(this.previousPos.x, this.previousPos.y, 2);
    line(this.previousPos.x, this.previousPos.y, this.previousPos.z, this.pos.x, this.pos.y, this.pos.z);
    
    this.previousPos = this.pos.copy();
  };

  this.attracted = function(target){
    var force = p5.Vector.sub(target, this.pos);
    var d = constrain(force.mag(), 1, MAX_ACC);
    force.setMag(G/(d * d));
    if (d < DIST_LIMIT) {
      //force.mult(-DIST_LIMIT);
    }
    this.acc.add(force);
  }

  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(VEL_LIMIT);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
}
