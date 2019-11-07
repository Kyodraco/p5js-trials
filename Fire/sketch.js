let buffer1, buffer2;

function setup() {
  createCanvas(800, 600);

  buffer1 = createImage(width, height);
  buffer2 = createImage(width, height);

  buffer1.loadPixels();
  for (var x = 20; x < buffer1.length - 20; x++) {
    var y = height - 1;
    var index = x + y * width;
    buffer1.pixels[index] = color(255,0,0);
  }
  buffer1.updatePixels();
}

function draw() {
  background(0);
  image(buffer1, 0, 0);
}
