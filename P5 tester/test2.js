function setup() {
  createCanvas(100, 100);

  background(200);

  // Set the noise level and scale.
  let noiseLevel = 255;
  let noiseScale = 0.01;

  // Iterate from top to bottom.
  for (let y = 0; y < height; y += 1) {
    // Iterate from left to right.
    for (let x = 0; x < width; x += 1) {
      // Scale the input coordinates.
      let nx = noiseScale * x;
      let ny = noiseScale * y;

      // Compute the noise value.
      let c = noiseLevel * noise(nx, ny);
        console.log(c);
      // Draw the point.
      stroke(c);
      point(x, y);
    }
  }

  describe('A gray cloudy pattern.');
}