function Slime(x = 0, y = 0, weight = 10, state = "", direction = "") {
  this.pos = createVector(x, y)
  this.weight = weight
  this.state = state
  this.direction = direction
  this.dots = []

  this.update = function () {
    this.gravity
  }

  this.draw = function () {
    push()
    strokeWeight(4)
    point(x, y)

    translate(this.pos.x, this.pos.y)

    for (var v = 0; v < this.dots.length; v++) {
      point(this.dots[v].x, this.dots[v].y)
    }

    strokeWeight(1)
    fill(color(0, 250, 20))
    // noFill()
    beginShape()
    curveVertex(this.dots[0].x, this.dots[0].y)
    for (var v = 0; v < this.dots.length; v++) {
      curveVertex(this.dots[v].x, this.dots[v].y)
    }
    endShape(CLOSE)

    stroke(color("white"))
    strokeWeight(2)
    fill(color(250, 200, 0))
    ellipse(0, 0, this.weight / 2)
    pop()
  }

  this.setState = function (state, right = null) {
    if (state === this.state) return

    switch (state) {
      case "jumping":
        this.dots = [
          {
            x: 0,
            y: this.weight * 1.2,
            weight: this.weight,
          },
          {
            x: -this.weight / 2,
            y: 0,
            weight: this.weight,
          },
          {
            x: 0,
            y: -this.weight / 1.5,
            weight: this.weight,
          },
          {
            x: this.weight / 2,
            y: 0,
            weight: this.weight,
          },
        ]
        break
      case "falling":
        this.dots = [
          {
            x: 0,
            y: -this.weight * 1.2,
            weight: this.weight,
          },
          {
            x: -this.weight / 2,
            y: 0,
            weight: this.weight,
          },
          {
            x: 0,
            y: this.weight / 1.5,
            weight: this.weight,
          },
          {
            x: this.weight / 2,
            y: 0,
            weight: this.weight,
          },
        ]
        break
      case "walking":
        if (right !== null) {
          if (right) {
            this.dots = [
              {
                x: -this.weight / 2,
                y: -this.weight / 2,
                weight: this.weight,
              },
              {
                x: 0,
                y: -this.weight / 1.5,
                weight: this.weight,
              },
              {
                x: this.weight / 2,
                y: -this.weight / 2,
                weight: this.weight,
              },
              {
                x: this.weight / 1.5,
                y: this.weight / 2,
                weight: this.weight,
              },
              {
                x: -this.weight,
                y: this.weight / 2,
                weight: this.weight,
              },
            ]
          } else {
            this.dots = [
              {
                x: -this.weight / 2,
                y: -this.weight / 2,
                weight: this.weight,
              },
              {
                x: 0,
                y: -this.weight / 1.5,
                weight: this.weight,
              },
              {
                x: this.weight / 2,
                y: -this.weight / 2,
                weight: this.weight,
              },
              {
                x: this.weight,
                y: this.weight / 2,
                weight: this.weight,
              },
              {
                x: -this.weight / 1.5,
                y: this.weight / 2,
                weight: this.weight,
              },
            ]
          }
        }
        break
      case "dashing":
        
        if (right !== null) {
          if (right) {
            this.dots = [
              {
                x: -this.weight * 1.2,
                y: this.weight / 2,
                weight: this.weight,
              },
              {
                x: 0,
                y: -this.weight / 2,
                weight: this.weight,
              },
              {
                x: this.weight / 2,
                y: -this.weight / 3,
                weight: this.weight,
              },
              {
                x: this.weight / 2,
                y: this.weight / 2,
                weight: this.weight,
              },
            ]
          } else {
            this.dots = [
              {
                x: this.weight * 1.2,
                y: this.weight / 2,
                weight: this.weight,
              },
              {
                x: 0,
                y: -this.weight / 2,
                weight: this.weight,
              },
              {
                x: -this.weight / 2,
                y: -this.weight / 3,
                weight: this.weight,
              },
              {
                x: -this.weight / 2,
                y: this.weight / 2,
                weight: this.weight,
              },
            ]
          }
        }
        break
      case "smashing":
        break
      case "standing":
      default:
        this.dots = [
          {
            x: -this.weight / 2,
            y: -this.weight / 2,
            weight: this.weight,
          },
          {
            x: 0,
            y: -this.weight / 1.5,
            weight: this.weight,
          },
          {
            x: this.weight / 2,
            y: -this.weight / 2,
            weight: this.weight,
          },
          {
            x: this.weight,
            y: this.weight / 2,
            weight: this.weight,
          },
          {
            x: -this.weight,
            y: this.weight / 2,
            weight: this.weight,
          },
        ]
        break
    }
    this.state = state
  }
}
