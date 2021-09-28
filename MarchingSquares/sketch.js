let field = []
let cellsField = []
let categories = []
let cols
let rows

let increment = 0.5
let incrementX = 0
let incrementY = 0
let incrementZ = 0
let xstart = 1000
let ystart = 1000
let zstart = 1000
let fullCells = []
let regions = []

let rez = 5
let seed = 0
let octaves = 4
let persistance = 1
let lacunarity = 2
let useFallMap = false

function setup() {
  let winHeight = 600
  let winWidth = 600
  // let winHeight = windowHeight
  // let winWidth = windowWidth

  categories = [
    { name: "Deepest", val: -1, color: color(0, 0, 20) },
    { name: "DeepOcean", val: 0.2, color: color(0, 0, 120) },
    { name: "Ocean", val: 0.47, color: color(0, 50, 180) },
    { name: "Beach", val: 0.5, color: color(180, 180, 0) },
    { name: "Plain", val: 0.58, color: color(100, 200, 0) },
    { name: "HighPlain", val: 0.6, color: color(50, 200, 0) },
    { name: "Mount", val: 0.65, color: color(0, 120, 0) },
    { name: "HighMount", val: 0.86, color: color(50, 50, 0) },
    { name: "Snow", val: 1, color: color(255, 255, 255) },
  ]

  createCanvas(winWidth, winHeight)
  cols = 1 + winWidth / rez
  rows = 1 + winHeight / rez

  $("#seed").val(seed)
  $("#resolution").val(rez)
  $("#octaves").val(octaves)
  $("#persistance").val(persistance)
  $("#lacunarity").val(lacunarity)
}

function generateField(xstart = 0, ystart = 0, zstart = 0) {
  noiseSeed(seed)

  field = []
  let xoff = xstart
  let index = 0
  let maxNoiseHeight = -Infinity
  let minNoiseHeight = Infinity

  for (var i = 0; i < cols; i++) {
    let yoff = ystart
    field.push([])
    for (var j = 0; j < rows; j++) {
      let amplitude = 1
      let frequency = 1
      let noiseHeight = 0
      let dotValue = 0

      for (var o = 0; o < octaves; o++) {
        dotValue =
          noise(xoff * frequency, yoff * frequency, zstart * frequency) * 2 - 1

        amplitude *= persistance
        frequency *= lacunarity
      }

      if (dotValue > maxNoiseHeight) {
        maxNoiseHeight = dotValue
      } else if (dotValue < minNoiseHeight) {
        minNoiseHeight = dotValue
      }

      let dot = new Dot(i, j, dotValue, index)
      field[i].push(dot)

      if (dot.bit === 1) {
        fullCells.push(dot)
      }
      index++
      yoff += increment
    }
    xoff += increment
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var val = field[i][j].value
      field[i][j].setValue(map(val, minNoiseHeight, maxNoiseHeight, 0, 1))
    }
  }
  //console.log(minNoiseHeight, maxNoiseHeight)
}

function generateCells() {
  cellsField = []
  for (var i = 0; i < cols - 1; i++) {
    cellsField.push([])
    for (var j = 0; j < rows - 1; j++) {
      cellsField[i].push(
        new Cell(
          i,
          j,
          getDot(i, j),
          getDot(i + 1, j),
          getDot(i + 1, j + 1),
          getDot(i, j + 1)
        )
      )
    }
  }
}

function mousePressed() {
  //console.log("mouse pressed")
  //loop()
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      incrementX = -increment
      break
    case RIGHT_ARROW:
      incrementX = increment
      break
    case UP_ARROW:
      incrementY = -increment
      break
    case DOWN_ARROW:
      incrementY = increment
      break
    default:
      incrementX = 0
      incrementY = 0
      incrementZ = 0
      break
  }
}

function keyReleased() {
  switch (keyCode) {
    case LEFT_ARROW:
    case RIGHT_ARROW:
      incrementX = 0
      break
    case UP_ARROW:
    case DOWN_ARROW:
      incrementY = 0
      break
    default:
      incrementX = 0
      incrementY = 0
      incrementZ = 0
      break
  }
}

function areNeighbours(cellA, cellB) {
  return (
    (cellA.x == cellB.x && Math.abs(cellA.y - cellB.y) == 1) ||
    (cellA.y == cellB.y && Math.abs(cellA.x - cellB.x) == 1)
  )
}

function getDot(x, y) {
  try {
    return field[x][y]
  } catch (e) {
    return null
  }
}

function draw() {
  // set values with the form
  seed = $("#seed").val()
  rez = $("#resolution").val()
  octaves = $("#octaves").val()
  persistance = $("#persistance").val()
  lacunarity = $("#lacunarity").val()
  useFallMap = document.getElementById('useFallMap').checked

  //noLoop()
  colorMode(RGB, 255)
  background(127)

  generateField(xstart, ystart, zstart)
  generateCells()
  xstart += incrementX
  ystart += incrementY
  zstart += incrementZ

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      //stroke(field[i][j].value * 255)
      try {
        stroke(field[i][j].category.color)
      } catch (e) {
        console.error(field[i][j])
      }
      strokeWeight(4)
      point(i * rez, j * rez)
    }
  }

  strokeWeight(1)
  stroke(0)

  for (var i = 0; i < cols - 1; i++) {
    for (var j = 0; j < rows - 1; j++) {
      //noStroke()
      //fill(field[i][j].value * 255)
      //square(i * rez, j * rez, rez)

      stroke(color(220, 220, 0))
      let cell = cellsField[i][j]
      cell.draw()
    }
  }
}

function drawLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y)
}
