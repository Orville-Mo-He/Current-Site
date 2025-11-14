let canvas;



function setup() {


    canvas = createCanvas(innerWidth, innerHeight);


}

function draw() {
    background(50);

    let noiseLevel = innerWidth;
    console.log(noiseLevel);
    let noiseScale = 0.005;
    let noiseCounter = frameCount * noiseScale;
    let y = noiseLevel * noise(noiseCounter);
    stroke('magenta');

    for (let i = 0; i < canvas.height; i+=5) {
        line(0, i+1, y, i+1);
    }

}

function windowResized() {
    console.log("resized");
    resizeCanvas(innerWidth, innerHeight);
    // background(50);




}




// Create 4 x points, and 4 y points so that