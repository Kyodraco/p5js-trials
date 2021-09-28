/**
 * A particle is a living entity that starts with a random velocity, constrained with MAX_SPEED
 * 
 */
class Particle extends LivingEntity{
  /**
   * @param {int} x 
   * @param {int} y 
   * @param {int} size 
   * @param {Color} color 
   * @param {int} life 
   * @param {int} lifeStep 
   */
  constructor(x, y, size, color, life, lifeStep = 1){
    super(x, y, size, color, life, lifeStep);
    this.velocity = p5.Vector.random2D()
      .mult(random(0.2, MAX_SPEED))
    this.acc = createVector(0,0);
  }

  draw() {
    push();
    this.color.setAlpha(map(this.life, 0, this.maxLife, 0, 255));
    // this.color.setAlpha(this.life);
    stroke(this.color);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  applyForce(force){
    this.acc.add(force);
  }

  edges() {
    if (this.y >= height - this.size) {
      this.y = height - this.size;
      this.velocity.y *= -1;
    }

    if (this.x >= width - this.size) {
      this.x = width - this.size;
      this.velocity.x *= -1;
    } else if (this.x <= this.size) {
      this.x = this.size;
      this.velocity.x *= -1;
    }
  }

  update(){
    this.velocity.add(this.acc).limit(MAX_SPEED);
    this.add(this.velocity);
    this.acc.set(0,0);

    // life management
    this.life -= this.lifeStep;
  }
}