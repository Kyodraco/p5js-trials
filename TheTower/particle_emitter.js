class ParticleEmitter extends LivingEntity{
  constructor(x, y, size, color, life){
    super(x,y, size, color, life);
    this.particles = [];
  }

  emit(num){
    if(this.life > 0){
      for(var i = 0; i < num; i++){
        /**
         * coord x
         * coord y
         * particle size
         * color
         * life
         * lifestep
         */
        this.particles.push(new Particle(
          this.x,
          this.y, 
          PARTICLE_SIZE, 
          color(255),
          100,
          2
          ))
      }
    }
  }

  update(){
    this.emit(5)
    
    for(let particle of this.particles){
      particle.update();
      if(particle.isFinished()){
        this.particles.splice(particle, 1);
      }
    }

    this.life -= this.lifeStep;
  }

  isFinished(){
    return this.particles.length == 0;
  }

  show(){
    for(let particle of this.particles){
      particle.draw();
    }

    // push();
    // strokeWeight(2);
    // stroke(map(this.life, 0, this.maxLife, 0, 255));
    // noFill();
    // ellipse(this.x, this.y, 2*PARTICLE_SIZE)
    // pop();
  }
}