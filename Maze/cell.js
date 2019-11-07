function Cell(i, j) {
  this.i = i;
  this.j = j;
  // top, right, bottom, left
  this.walls = [true, true, true, true];
  this.visited = false;

  this.show = function(isPath = false) {
    var x = this.i * w;
    var y = this.j * w;

    if (this.visited) {
      noStroke();
      if(isPath){
        fill(200, 0, 0);
      } else {
        fill(0);
      }
      rect(x, y, w, w);
    }

    stroke(255);
    if (this.walls[0]) {
      // top
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      // right
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      // bottom
      line(x, y + w, x + w, y + w);
    }
    if (this.walls[3]) {
      // left
      line(x, y, x, y + w);
    }
  };

  this.index = function(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1;
    }

    return i + j * cols;
  };

  this.highlight = function() {
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(0, 220, 0);
    rect(x, y, w, w);
  }

  this.checkNeighbors = function() {
    var neighbors = [];
    var top = grid[this.index(i, j - 1)];
    var right = grid[this.index(i + 1, j)];
    var bottom = grid[this.index(i, j + 1)];
    var left = grid[this.index(i - 1, j)];

    if (top != undefined && !top.visited) {
      neighbors.push(top);
    }
    if (right != undefined && !right.visited) {
      neighbors.push(right);
    }
    if (bottom != undefined && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left != undefined && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = Math.floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };
}
