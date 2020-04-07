const Wave = (p) => {
  let t = 0; // time variable

  p.setup = function () {
    const { width, height, mouseX, mouseY, PI } = p;
    console.log('width, height!!!', window.innerWidth, window.innerHeight)
    p.createCanvas(window.innerWidth, 60);
    p.noStroke();
    // p.fill(220, 200, 40);
    p.fill(255, 235, 20);
  }
  p.draw = function () {
    // p.background(10, 10); // translucent background (creates trails)
    p.background(255, 193, 7, 10); // translucent background (creates trails)

    const { width, height, mouseX, mouseY, PI } = p;

    // make a x and y grid of ellipses
    for (let x = 0; x <= width; x = x + 30) {
      for (let y = 0; y <= height; y = y + 30) {

        // starting point of each circle depends on mouse position
        const xAngle = p.map(mouseX, 0, width, -4 * PI, 4 * PI, true);
        const yAngle = p.map(mouseY, 0, height, -4 * PI, 4 * PI, true);
        // and also varies based on the particle's location
        const angle = xAngle * (x / width) + yAngle * (y / height);

        // each particle moves in a circle
        const myX = x + 10 * Math.cos(2 * PI * t + angle);
        const myY = y + 10 * Math.sin(2 * PI * t + angle);

        p.ellipse(myX, myY, 15); // draw particle
      }
    }

    t = t + 0.01; // update time
  }
}

export default Wave