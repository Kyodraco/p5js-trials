/**
 * A Bullet has a starting point, a target, a given speed and damages
 * It's considered finished if it's over the edges or if it bumps into an object
 */
class Bullet extends p5.Vector {
  /**
   *  
   * @param {Vector} start
   * @param {Vector} direction
   * @param {float} speed
   * @param {float} damages
   */
  constructor(start, target, speed, damages) {
    super(start.x, start.y)
    this.damages = damages
    this.size = 5
    this.isFinished = false
    
    this.velocity = createVector(target.x, target.y).setMag(speed)
    this.acc = createVector(0,0);
  }

  update() {
    this.velocity.add(this.acc).limit(MAX_SPEED);
    this.add(this.velocity);
    this.acc.set(0,0);

    if(this.outsideEdges()){
      this.isFinished = true
    }
  }

  /**
   * returns true if the position is out of the borders
   */
  outsideEdges() {
    if (this.y >= height - this.size) {
      return true
    }
    if (this.x >= width - this.size) {
      return true
    } 
    if (this.x <= this.size) {
      return true
    } 
    if (this.y <= this.size) {
      return true
    }

    return false;
  }

  applyForce(force){
    this.acc.add(force);
  }

  show() {
    push()
    stroke(255)
    strokeWeight(this.size)
    translate(this.x, this.y)
    rotate(this.velocity.heading())
    line(0, 0, this.size, 0)
    pop()
  }
}
