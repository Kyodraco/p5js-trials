function Pad(startX, y, color, price, spawnSpeed, padSpeed) {
  this.x = startX;
  this.y = y;
  this.color = color;
  this.price = price;
  this.spawnSpeed = spawnSpeed;

  this.direction = 1;
  this.speed = padSpeed;
  this.w = 30;
  this.h = 15;
  this.timer = 0;

  this.move = function() {
    this.x += this.direction * this.speed;

    if ((this.x + this.w > width) | (this.x < this.w)) {
      this.direction *= -1;
    }
  };

  this.spawnBall = function() {
    if (this.timer >= this.spawnSpeed) {
      this.timer = 0;
      balls.push(new Ball(this.x, 20, 15, 1, this.color));
    } else {
      this.timer++;
    }
  };

  this.updateSpawnSpeed = function() {
    this.spawnSpeed = Math.floor(this.spawnSpeed * 0.98);
    console.log("new spawnSpeed : " + this.spawnSpeed);
  };
  this.updatePrice = function() {
    this.price = Math.floor(this.price * 1.5);
    console.log("new price : " + this.price);
  };

  this.show = function() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    rect(0, 0, this.w, this.h);
    fill(0);
    text(this.spawnSpeed, 0, 0, this.w, this.h);
    pop();
  };

  this.live = function() {
    this.move();
    this.spawnBall();
    this.show();
  };
}
