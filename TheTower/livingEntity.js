/**
 * A living entity has a position, size, color and life that can decrease at a given speed
 * It's considered 'finished' when life is under 0
 */
class LivingEntity extends p5.Vector{

  /**
   * @param {int} x 
   * @param {int} y 
   * @param {int} size 
   * @param {Color} color 
   * @param {int} life 
   * @param {int} lifeStep 
   */
  constructor(x, y, size, color, life = 100, lifeStep = 1){
    super(x,y);
    this.color = color;
    this.size = size;
    this.life = life;
    this.maxLife = life;
    this.lifeStep = lifeStep;
  }

  isFinished(){
    return this.life <= 0;
  }
}