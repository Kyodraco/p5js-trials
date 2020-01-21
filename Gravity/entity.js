function Entity() {

  this.setShowParams = function() {
    if (this.body.displayOptions) {
      if (this.body.displayOptions.noStroke) noStroke();
      if (this.body.displayOptions.color) {
        fill(this.body.displayOptions.color);
      }
      if (this.body.displayOptions.strokeColor) {
        stroke(this.body.displayOptions.strokeColor);
      }
    }
  };

  this.isOutOfScreen = function() {
    return !this.body.isStatic && this.body.position.y - 2 * this.r > height;
  };

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  };

  this.scale = function(scale){
      Body.scale(this.body, scale, scale);
  }
}
