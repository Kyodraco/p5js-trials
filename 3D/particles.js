function Particle(x, y, z, color) {
  this.pos = createVector(x, y,z);
  this.previousPos = [];
  this.vel = p5.Vector.random3D();
  this.vel.mult(5);
  this.acc = createVector();
  this.color = color;

  this.show = function() {
    strokeWeight(1);
    stroke(this.color);
    line(this.pos.x, this.pos.y, this.pos.z, this.previousPos[this.previousPos.length-1].x, this.previousPos[this.previousPos.length-1].y, this.previousPos[this.previousPos.length-1].z);
    for(var i = this.previousPos.length - 1; i > 0; i--){
      //line(this.previousPos[i-1].x, this.previousPos[i-1].y, this.previousPos[i-1].z, this.previousPos[i].x, this.previousPos[i].y, this.previousPos[i].z);
    }

    //this.previousPos = this.pos.copy();
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
    this.previousPos.push(this.pos.copy());
    if(this.previousPos.length > 3 ){
      this.previousPos.splice(0,1);
    }

    this.vel.add(this.acc);
    this.vel.limit(VEL_LIMIT);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
}
