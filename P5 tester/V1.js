let canvas;
let cluster1, cluster2, cluster3;
var c_width = document.getElementById('cvnContainer').offsetWidth;
var c_height = document.getElementById('cvnContainer').offsetHeight;

function setup() {

    let minLayers = 100;
    let maxLayers = 500;
    let lpcArray = genLayersPerCluster(3, minLayers, maxLayers);

    canvas = createCanvas(c_width, c_height);
    canvas.parent('cvnContainer');

    strokeWeight(1);
    // rect(0, 0, canvas.width, canvas.height);
    // line(canvas.width / 2, 0, canvas.width / 2, canvas.height);

    cluster1 = new Cluster(
        lpcArray[0],

        // start point
        canvas.width * 0 / 12, canvas.height * 2 / 12,

        // apex control point 1
        canvas.width * 1 / 12, canvas.height * 2.5 / 12,

        // apex control point 2
        canvas.width * 4 / 12, canvas.height * 5 / 12,

        // apex point
        canvas.width * 6 / 12, canvas.height * 3 / 12,

        // end control point 1
        canvas.width * 7 / 12, canvas.height * 2 / 12,

        // end control point 2
        canvas.width * 9 / 12, canvas.height * 3 / 12,

        // end point
        canvas.width * 12 / 12, canvas.height * 3 / 12
    );

    cluster1.pointsTester(false)
    cluster1.createAllLayers(-5, -5);


    cluster2 = new Cluster(
        lpcArray[0],

        // start point
        canvas.width * 0 / 12, canvas.height * 4 / 12,

        // apex control point 1
        canvas.width * 2 / 12, canvas.height * 4 / 12,

        // apex control point 2
        canvas.width * 4 / 12, canvas.height * 6 / 12,

        // apex point
        canvas.width * 7 / 12, canvas.height * 3 / 12,

        // end control point 1
        canvas.width * 8 / 12, canvas.height * 2 / 12,

        // end control point 2
        canvas.width * 9 / 12, canvas.height * 4 / 12,

        // end point
        canvas.width * 12 / 12, canvas.height * 4 / 12
    );

    cluster2.pointsTester(true)
    // cluster2.createAllLayers(3, 3);


    cluster3 = new Cluster(
        lpcArray[0],
        0, canvas.height / 3, // start point
        canvas.width / 4, canvas.height / 3, // apex control point 1
        canvas.width * 2 / 8, canvas.height / 6, // apex control point 2
        canvas.width / 4, canvas.width / 8, // apex point
        canvas.width / 4, canvas.height / 8, // end control point 1
        canvas.width / 4, 0, // end control point 2
        canvas.width * 3 / 8, 0 // end point
    );

}

// noise is more beautiful without setting a noise seed

class Cluster {
    // takes corrdinates of the 2 endpoints of the outermost layer of the
    // cluster and creates a cluster of layers within those bounds.
    // The first point will always be a [vertex],
    // the second and third points will always be a [bezier vertexes]
    // This means that the remaining points will always have control points.


    constructor(numLayers, startP_x, startP_y, apexCP1_x, apexCP1_y, apexCP2_x, apexCP2_y, apexP_x, apexP_y, endCP1_x, endCP1_y, endCP2_x, endCP2_y, endP_x, endP_y) {
        this.numLayers = numLayers;
        this.startP_x = startP_x;
        this.startP_y = startP_y;

        // apex control points
        this.apexCP1_x = apexCP1_x;
        this.apexCP1_y = apexCP1_y;
        this.apexCP2_x = apexCP2_x;
        this.apexCP2_y = apexCP2_y;

        // apex point
        this.apex_x = apexP_x;
        this.apex_y = apexP_y;

        // end control points
        this.endCP1_x = endCP1_x;
        this.endCP1_y = endCP1_y;
        this.endCP2_x = endCP2_x;
        this.endCP2_y = endCP2_y;

        // end point
        this.endP_x = endP_x;
        this.endP_y = endP_y;



        // what needs to have the organic?
        // the distances between layers
        // the amount of layers per cluster
        // the shape of each layer?
    }

    pointsTester(bool=true) {

        if (bool == true) {

            noFill();

            stroke(250, 100, 100);
            strokeWeight(10);
            point(this.startP_x, this.startP_y);

            stroke(100, 100, 250);
            strokeWeight(5);
            point(this.apexCP1_x, this.apexCP1_y);
            point(this.apexCP2_x, this.apexCP2_y);

            stroke(250, 100, 100);
            strokeWeight(10);
            point(this.apex_x, this.apex_y);

            stroke(100, 100, 250);
            strokeWeight(5);
            point(this.endCP1_x, this.endCP1_y);
            point(this.endCP2_x, this.endCP2_y);

            stroke(250, 100, 100);
            strokeWeight(10);
            point(this.endP_x, this.endP_y);

            stroke(0, 250, 0);
            strokeWeight(2);
            line(this.startP_x, this.startP_y, this.apexCP1_x, this.apexCP1_y);
            line(this.apexCP2_x, this.apexCP2_y, this.apex_x, this.apex_y);
            line(this.apex_x, this.apex_y, this.endCP1_x, this.endCP1_y);
            line(this.endCP2_x, this.endCP2_y, this.endP_x, this.endP_y);

            strokeWeight(2);
            stroke(0, 50);
            // let testmod = -10;
            // this.createLayer(this.startP_x + (testmod * noise(1)), this.startP_y + (testmod * noise(1)), this.apexCP1_x + (testmod * noise(1)), this.apexCP1_y + (testmod * noise(1)), this.apexCP2_x + (testmod * noise(1)), this.apexCP2_y + (testmod * noise(1)), this.apex_x + (testmod * noise(1)), this.apex_y + (testmod * noise(1)), this.endCP1_x + (testmod * noise(1)), this.endCP1_y + (testmod * noise(1)), this.endCP2_x + (testmod * noise(1)), this.endCP2_y + (testmod * noise(1)), this.endP_x + (testmod * noise(1)), this.endP_y + (testmod * noise(1)));

        }
        this.createLayer(this.startP_x, this.startP_y, this.apexCP1_x, this.apexCP1_y, this.apexCP2_x, this.apexCP2_y, this.apex_x, this.apex_y, this.endCP1_x, this.endCP1_y, this.endCP2_x, this.endCP2_y, this.endP_x, this.endP_y);

        noStroke();
        fill(0);
        text('start', this.startP_x, this.startP_y)
        text('apex cp 1', this.apexCP1_x, this.apexCP1_y)
        text('apex cp 2', this.apexCP2_x, this.apexCP2_y)
        text('apex', this.apex_x, this.apex_y)
        text('end cp 1', this.endCP1_x, this.endCP1_y)
        text('end cp 2', this.endCP2_x, this.endCP2_y)
        text('end', this.endP_x, this.endP_y)

    }

    createLayer(startP_x, startP_y, apexCP1_x, apexCP1_y, apexCP2_x, apexCP2_y, apexP_x, apexP_y, endCP1_x, endCP1_y, endCP2_x, endCP2_y, endP_x, endP_y) {
        beginShape();
        vertex(startP_x, startP_y);
        bezierVertex(apexCP1_x, apexCP1_y, apexCP2_x, apexCP2_y, apexP_x, apexP_y);
        bezierVertex(endCP1_x, endCP1_y, endCP2_x, endCP2_y, endP_x, endP_y);
        endShape();
    }

    createAllLayers(x_mod, y_mod) {

        // to properly instantiate, they need be shifted based on distPerLayer
        noFill();
        stroke(0);

        // console.log(`x_mod: ${x_mod}, y_mod: ${y_mod}`);
        // console.log(`this.numLayers: ${this.numLayers}`);

        for (let i = 0; i < this.numLayers; i++) {
            let noiseValAt_i = noise(0.1 * i);

            strokeWeight(1.5 - noiseValAt_i);

            this.createLayer(
                this.startP_x, this.startP_y + (y_mod * noiseValAt_i * i),
                this.apexCP1_x, this.apexCP1_y + (y_mod * noiseValAt_i * i),
                this.apexCP2_x, this.apexCP2_y + (y_mod * noiseValAt_i * i),
                this.apex_x, this.apex_y + (y_mod * noiseValAt_i * i),
                this.endCP1_x, this.endCP1_y + (y_mod * noiseValAt_i * i),
                this.endCP2_x, this.endCP2_y + (y_mod * noiseValAt_i * i),
                this.endP_x, this.endP_y + (y_mod * noiseValAt_i * i)
            );
        }

    }

    // if not moving this is probably redundant
    display() {
        for (let i = 0; i < this.numLayers; i++) {
            this.createLayer();
        }
    }
}


function genLayersPerCluster(numClusters = 5, minLayers = 500, maxLayers = 1000) {
    // Generate a semi-random number of layers for each cluster
    // using Perlin noise.

    let layersPerCluster = [];
    for (let i = 0; i < numClusters; i++) {
        layersPerCluster.push(int(map(noise(0.1 * i), 0, 1, minLayers, maxLayers)));
    }

    return layersPerCluster;
}

function noiseFuncTest() {

    strokeWeight(4);
    stroke('red');
    noFill();
    line(500, 0, 500, 1000);
    rect(0, 0, 1000, 1000);

    stroke(100)
    strokeWeight(0.25);

    // fixed noise seed each for loop set
    // will be the same as second set if the each for loop DOESN'T call a
    // newnoiseSeed(), it will be different than second set if it does.
    // let nSeed = random(0, 99);
    // noiseSeed(nSeed);
    for (let i = 0; i < 1000; i++) {
        line(1000 * noise(0.1 * i), 0, 1000 * noise(0.1 * i), 500);
    }

    // noiseSeed(random(0, 99));
    // random noise seed each itteration
    stroke(100, 50, 50, 100);
    for (let i = 0; i < 1000; i++) {
        // noiseSeed(nSeed);
        line(1000 * noise(0.1 * i), 500, 1000 * noise(0.1 * i), 1000);
    }

    // this shows that the seed is set randomly each time before the first
    // call to noise(), so all subsequent calls to noise() with the same
    // parameters will return the same value. which is partially how it
    // feels organic. This means that if I want some elements to share a noise
    // pattern, and some that have their own noise pattern, I need to set
    // them independently:
    // let nSeed1 = random(0, 99);
    // let nSeed2 = random(0, 99);

    // noiseSeed(nSeed1);
    // line( ... noise(...) ... );
    // noiseSeed(nSeed2);
    // line( ... noise(...) ... );
    // this also shows how much random affects load time, since setting
    // the seed each itteration is much slower than when i have all the
    // noise seed setting lines commented off.

    // the seed is set at the script level, so each draw cycle will not change 
    // the seed value unless i specifically set it to.
}


function draw() {

}

function windowResized() {
    c_width = document.getElementById('cvnContainer').offsetWidth;
    c_height = document.getElementById('cvnContainer').offsetHeight;
    // resizeCanvas(c_width, c_height);
    console.log(`new width: ${c_width}, new height: ${c_height}`);

}