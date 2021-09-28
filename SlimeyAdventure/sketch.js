let slimey
let a_code = 65
let q_code = 81
let d_code = 68

function setup() {
  createCanvas(400, 400)

  slimey = new Slime(100, 100, 50)
  slimey.setState("dashing", false)
}

function keysAreDown() {
  if (keyIsDown(d_code)) {
    slimey.setState(keyIsDown(a_code) ? "dashing" : "walking", true)
  }
  if (keyIsDown(q_code)) {
    slimey.setState(keyIsDown(a_code) ? "dashing" : "walking", false)
  }
}

function keyReleased() {
  slimey.setState("standing")
}

function draw() {
  background(220)
  keysAreDown()
  slimey.draw()

  // noLoop()
}
