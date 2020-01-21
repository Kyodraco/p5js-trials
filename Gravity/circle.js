function Circle(x, y, r, options) {
  Entity.call(this);
  options.label = options.label ? options.label : "circle";
  this.body = Bodies.circle(x, y, r / 2, options);
  this.r = r;
  World.add(world, this.body);
  
  Circle.prototype = Entity.prototype;
  Circle.prototype.constructor = Circle;

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    this.setShowParams();
    
    translate(pos.x, pos.y);
    rotate(angle);
    ellipse(0, 0, this.r, this.r);
    pop();
  };
  
  this.changeSize = function(size){
    var scale = size/this.r;
    this.r = size;
    this.scale(scale);
  }

}
