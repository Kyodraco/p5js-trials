class Tower {
  constructor(x, y, life) {
    this.x = x;
    this.y = y;
    this.maxLife = life;
    this.shots = [];
    this.width = 20;
    this.height = 20;
  }
  
  update(){
    
  }

  show(){

    let poly_sides = 6;
    let radius = min([this.width, this.height])/2;
    let points = this.generatePolygonPoints(0, 0, radius, poly_sides);
    
    noFill();
    translate(this.x - this.width/2, this.y - this.height/2);
    beginShape();
    for(let i = 0; i < poly_sides; i++){
      vertex(points[i][0], points[i][1]);
    }
    endShape(CLOSE);
  }


  generatePolygonPoints(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    let points = [];

    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      append(points, [sx, sy]);

    }
    return points;
  }

}