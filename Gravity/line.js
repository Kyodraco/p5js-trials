function Line(x, y, l, a, options) {
  Entity.call(this);
  options.angle = a;
  options.label = "line",
  this.body = Bodies.rectangle(x, y, l, 3, options);
  this.w = l;
  this.h = 3;
  World.add(world, this.body);

  Line.prototype = Entity.prototype;
  Line.prototype.constructor = Line;

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
