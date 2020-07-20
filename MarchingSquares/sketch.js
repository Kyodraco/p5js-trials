let field = []
let cols
let rows
let rez
let increment = 0.1
let zoff = 0

function setup() {
  let winHeight = 600
  let winWidth = 800
  createCanvas(winWidth, winHeight)
  rez = 10
  cols = 1 + winWidth / rez
  rows = 1 + winHeight / rez
}

function generateField(zoff) {
  let xoff = 0
  for (var i = 0; i < cols; i++) {
    let yoff = 0
    field[i] = []
    for (var j = 0; j < rows; j++) {
      field[i].push(generateRandom(xoff, yoff, zoff))
      yoff += increment
    }
    xoff += increment
  }
}

function generateRandom(x, y, z) {
  return noise(x, y, z)
}

/**
 *  a * p * b
 *  *       *
 *  s       q
 *  *       *
 *  d * r * c
 *
 */
function draw() {
  background(127)

  generateField(zoff)
  zoff += increment

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      stroke(field[i][j] * 255)
      strokeWeight(4)
      point(i * rez, j * rez)
    }
  }

  for (var i = 0; i < cols - 1; i++) {
    for (var j = 0; j < rows - 1; j++) {
      let x = i * rez
      let y = j * rez
      let x2 = x + rez
      let y2 = y + rez

      let a = { x: x, y: y, value: field[i][j] }
      let b = { x: x2, y: y, value: field[i + 1][j] }
      let c = { x: x2, y: y2, value: field[i + 1][j + 1] }
      let d = { x: x, y: y2, value: field[i][j + 1] }
      // console.log(a, b, c, d)

      // let px = getBar(a.x, b.x, a.value, b.value)
      // let qy = getBar(b.x, c.x, b.value, c.value)
      // let rx = getBar(c.x, d.x, c.value, d.value)
      // let sy = getBar(d.x, a.x, d.value, a.value)

      let p = createVector(x + rez * 0.5, y)
      let q = createVector(x2, y + rez * 0.5)
      let r = createVector(x + rez * 0.5, y2)
      let s = createVector(x, y + rez * 0.5)

      // console.log(p.x, p.y)
      // console.log(q.x, q.y)
      // console.log(r.x, r.y)
      // console.log(s.x, s.y)

      // strokeWeight(3)
      // stroke(255, 0, 0)
      // point(p.x + 1, p.y)
      // stroke(0, 255, 0)
      // point(q.x, q.y + 1)
      // stroke(0, 0, 255)
      // point(r.x - 1, r.y)
      // stroke(255, 255, 0)
      // point(s.x, s.y - 1)

      strokeWeight(1)
      stroke(0)
      let state = getState(a.value, b.value, c.value, d.value)

      switch (state) {
        case 1:
          drawLine(r, s)
          break
        case 2:
          drawLine(q, r)
          break
        case 3:
          drawLine(q, s)
          break
        case 4:
          drawLine(p, q)
          break
        case 5:
          drawLine(p, s)
          drawLine(q, r)
          break
        case 6:
          drawLine(p, r)
          break
        case 7:
          drawLine(p, s)
          break
        case 8:
          drawLine(p, s)
          break
        case 9:
          drawLine(p, r)
          break
        case 10:
          drawLine(p, q)
          drawLine(r, s)
          break
        case 11:
          drawLine(p, q)
          break
        case 12:
          drawLine(s, q)
          break
        case 13:
          drawLine(q, r)
          break
        case 14:
          drawLine(r, s)
          break
        case 15:
          break
      }
    }
  }
  // noLoop()
}

function getBar(pos1, pos2, val1, val2) {
  if (val1 == val2) {
    return (pos1 + pos2) / 2
  }
  // var result = (pos1 + pos2) / 2 + rez * Math.abs(1 - val1 / (val2 - val1))
  var result = pos1 + (pos2 - pos1) * ((1 - val1) / (val2 - val1))
  // console.log(result)
  return result
}

/**
 *  a * p * b
 *  *       *
 *  s       q
 *  *       *
 *  d * r * c
 *
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {*} d
 */
function getState(a, b, c, d) {
  return (
    Math.round(a) * 8 +
    Math.round(b) * 4 +
    Math.round(c) * 2 +
    Math.round(d) * 1
  )
}

function drawLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y)
}
