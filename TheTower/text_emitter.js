/**
 * 
 * @param {int} x 
 * @param {int} y 
 * @param {int} size 
 * @param {Color} color 
 * @param {int} life 
 * @param {string} text 
 */
class TextEmitter extends LivingEntity{
  constructor(x, y, size, color, life, text){
    super(x,y, size, color, life);
    this.text = text
  }

  update(){
    this.life -= this.lifeStep;
  }

  isFinished(){
    return this.life <= 0;
  }

  show(){
    push();
    strokeWeight(2);
    this.color.setAlpha(map(this.life, 0, this.maxLife, 0, 255));
    stroke(this.color)
    let offset = map(this.life, this.maxLife, 0, 0, 30)
    text(this.text, this.x, this.y - offset)
    pop();
  }
}