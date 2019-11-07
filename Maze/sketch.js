let w = 20;
let cols, rows;
let grid = [];
let current;
let stack = [];
let path = [];
let isPathCompleted = false;
let counter = 0;
let drawWalls = false;

function setup() {
  ///createCanvas(400, 400);
  //createCanvas(1000, 600);
  //createCanvas(1500, 900);
  fullscreen(true);
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / w);
  rows = floor(height / w);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      grid.push(new Cell(i, j));
    }
  }
  current = grid[0];
  background(150);
  console.log(width, height, cols, rows);
}

function keyPressed() {
  if (keyCode == RETURN) {
    drawWalls = !drawWalls;
  }
}

function checkWalls(current, next) {
  var diffX = current.i - next.i;
  var diffY = current.j - next.j;

  if (diffX === -1) {
    current.walls[1] = false;
    next.walls[3] = false;
    //console.log("right");
  } else if (diffX === 1) {
    current.walls[3] = false;
    next.walls[1] = false;
    //console.log("left");
  } else if (diffY === -1) {
    current.walls[2] = false;
    next.walls[0] = false;
    //console.log("bottom");
  } else if (diffY === 1) {
    current.walls[0] = false;
    next.walls[2] = false;
    //console.log("top");
  }
}

function draw() {
  if (drawWalls) {
    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }
  }

  current.visited = true;
  current.highlight();

  // step 1
  var next = current.checkNeighbors();

  if (next != undefined) {
    next.visited = true;
    // step 2
    stack.push(current);

    if (!isPathCompleted) {
      path.push(current);
    }
    if (next.i == cols - 1 && next.j == rows - 1) {
      console.log(next);
      isPathCompleted = true;
    }
    // step 3
    checkWalls(current, next);
    // step 4
    current = next;
  } else if (stack.length > 0) {
    //frameRate(40);
    current = stack.pop();
    if (!isPathCompleted) {
      path.pop();
    }
  } else {
    frameRate(30);
    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }
    for (var p = 0; p < counter; p++) {
      path[p].show(true);
    }
    if (counter < path.length) {
      counter++;
    } else {
      console.log("finished");
      var maze = {
        cols: cols,
        rows: rows,
        grid: grid,
        path: path
      };
      console.log(maze);
      //saveJSON(maze, "maze.json");
      noLoop();
    }
  }
}
