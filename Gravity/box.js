function Box(x, y, w, h, options) {
  Entity.call(this);
  options.label = "box",
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  Box.prototype = Entity.prototype;
  Box.prototype.constructor = Box;

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    this.setShowParams();

    translate(pos.x, pos.y);
    rotate(angle);
    rect(0, 0, this.w, this.h);
    pop();
  };

  this.changeSize = function(size){
    
    this.scale(size);
  }

}
