/**
 *  a * p * b
 *  *       *
 *  s       q
 *  *       *
 *  d * r * c
 *
 */
function Cell(x, y, a, b, c, d) {
  this.x = x;
  this.y = y;

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;

  this.state = this.getState()
}

Cell.prototype.draw = function() {
  /*
  fill(0)
  text(round(this.a.value*100),this.a.x + 10,this.a.y + 20)
  text(round(this.b.value*100),this.b.x - 40,this.b.y + 20)
  text(round(this.c.value*100),this.c.x - 40,this.c.y - 20)
  text(round(this.d.value*100),this.d.x + 10,this.d.y - 20)
  */
  switch (this.state) {
    case 1:
      this.calculateMidPoints()
      drawLine(this.r, this.s)
      break
    case 2:
      this.calculateMidPoints()
      drawLine(this.q, this.r)
      break
    case 3:
      this.calculateMidPoints()
      drawLine(this.q, this.s)
      break
    case 4:
      this.calculateMidPoints()
      drawLine(this.p, this.q)
      break
    case 5:
      this.calculateMidPoints()
      drawLine(this.p, this.s)
      drawLine(this.q, this.r)
      break
    case 6:
      this.calculateMidPoints()
      drawLine(this.p, this.r)
      break
    case 7:
      this.calculateMidPoints()
      drawLine(this.p, this.s)
      break
    case 8:
      this.calculateMidPoints()
      drawLine(this.p, this.s)
      break
    case 9:
      this.calculateMidPoints()
      drawLine(this.p, this.r)
      break
    case 10:
      this.calculateMidPoints()
      drawLine(this.p, this.q)
      drawLine(this.r, this.s)
      break
    case 11:
      this.calculateMidPoints()
      drawLine(this.p, this.q)
      break
    case 12:
      this.calculateMidPoints()
      drawLine(this.s, this.q)
      break
    case 13:
      this.calculateMidPoints()
      drawLine(this.q, this.r)
      break
    case 14:
      this.calculateMidPoints()
      drawLine(this.r, this.s)
      break
    case 15:
      //this.calculateMidPoints()
      break
  }
}

/**
 *  a * p * b
 *  *       *
 *  s       q
 *  *       *
 *  d * r * c
 *
 */
Cell.prototype.calculateMidPoints = function() {
  let px = this.getBar(this.a.x, this.b.x, this.a.value, this.b.value)
  let qy = this.getBar(this.b.y, this.c.y, this.b.value, this.c.value)
  let rx = this.getBar(this.d.x, this.c.x, this.d.value, this.c.value)
  let sy = this.getBar(this.a.y, this.d.y, this.a.value, this.d.value)

  //console.log(px,qy,rx,sy)
  this.p = createVector(px, this.a.y)
  this.q = createVector(this.b.x, qy)
  this.r = createVector(rx, this.d.y)
  this.s = createVector(this.a.x, sy)

  //this.p = createVector(this.a.x + rez * 0.5, this.a.y)
  //this.q = createVector(this.b.x, this.b.y + rez * 0.5)
  //this.r = createVector(this.d.x + rez * 0.5, this.d.y)
  //this.s = createVector(this.a.x, this.a.y + rez * 0.5)
  /*
  text(round(this.p.x),this.p.x,this.p.y + 20)
  text(round(this.q.y),this.q.x - 40,this.q.y)
  text(round(this.r.x),this.r.x,this.r.y - 20)
  text(round(this.s.y),this.s.x + 10,this.s.y)
  */
}



Cell.prototype.getState = function() {
  return (
    this.a.bit * 8 +
    this.b.bit * 4 +
    this.c.bit * 2 +
    this.d.bit * 1
  )
}


Cell.prototype.getBar = function(pos1, pos2, val1, val2) {
  /*if (val1 == val2) {
    return (pos1 + pos2) / 2
  }*/
  //var result = (pos1 + pos2) / 2 + rez * Math.abs(1 - val1 / (val2 - val1))
  //var result = pos1 + (pos2 - pos1) * ((1 - val1) / (val2 - val1))

  var result = map(val1 / (val1 + val2), 0, 1, pos1, pos2)

  //console.log(val1, val2, val1/(val1 + val2), pos1, pos2, result)
  return result
}