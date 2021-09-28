function Ball(x, y, r, price, color) {
  Circle.call(this, x, y, r, {
    friction: 0.1,
    restitution: 0.2,
    density: 0.3,
    label: "ball",
    displayOptions: {
        color: color,
        noStroke: true
    }
  });
  this.price = price;
  
  Ball.prototype = Circle.prototype;
  Ball.prototype.constructor = Ball;
  
  this.die = function(mult){
      score += this.price * mult;
      console.log(score);
      // crackSound.play();
      this.removeFromWorld();
  }
}
