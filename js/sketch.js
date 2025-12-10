let canvas;
let cluster1, cluster2, cluster3;
let cnvContainer = document.getElementById('cnvContainer');
var c_width = cnvContainer.offsetWidth;
var c_height = cnvContainer.offsetHeight;
var computedStyle = getComputedStyle(document.documentElement);

// If I stablize random numbers, I can use them create more varied compositions
// stabilize in the sense that I could use that same number for all the
// control points and the apex for example. and also stablize in the sense that
// the "random" numbers would be generated noise from the same seed.
// i would need 2 different y coordinates [2x(control point and vertex set)]
// for each cluster. So for 3 clusters, I would need 6 different y coordinates.

// i would multiply that by the magnitude I want to shift each point by.


function setup() {


    bgColor = color(computedStyle.getPropertyValue('background-color'));
    console.log(`bgColor: ${bgColor}`);

    let lpcArray = genLayersPerCluster(3, 100, 500);

    canvas = createCanvas(c_width, c_height);
    canvas.parent('cnvContainer');

    // rect(0, 0, canvas.width, canvas.height);
    // line(canvas.width / 2, 0, canvas.width / 2, canvas.height);

    cluster1 = new Cluster(
        lpcArray[0],

        // start point
        canvas.width * 0 / 12, canvas.height * 3 / 12,

        // end control point 1
        canvas.width * 7 / 12, canvas.height * 1 / 12,

        // end control point 2
        canvas.width * 9 / 12, canvas.height * 12 / 12,

        // end point
        canvas.width * 12 / 12, canvas.height * 13 / 12
    );

    // console.log('HI')
    cluster2 = new Cluster(
        lpcArray[1],

        // start point
        canvas.width * 0 / 12, canvas.height * 4 / 12,

        // end control point 1
        canvas.width * 8 / 12, canvas.height * 3 / 12,

        // end control point 2
        canvas.width * 9 / 12, canvas.height * 9 / 12,

        // end point
        canvas.width * 12 / 12, canvas.height * 10 / 12
    );

    cluster3 = new Cluster(
        lpcArray[2],

        // start point
        canvas.width * 0 / 12, canvas.height * 10 / 12,

        // end control point 1
        canvas.width * 8 / 12, canvas.height * 10 / 12,

        // end control point 2
        canvas.width * 9 / 12, canvas.height * 20 / 12,

        // end point
        canvas.width * 12 / 12, canvas.height * 20 / 12
    );


}

// noise is more beautiful without setting a noise seed

class Cluster {
    // takes corrdinates of the 2 endpoints of the outermost layer of the
    // cluster and creates a cluster of layers within those bounds.
    // The first point will always be a [vertex],
    // the second and third points will always be a [bezier vertexes]
    // This means that the remaining points will always have control points.


    constructor(numLayers, startP_x, startP_y,
        //  apexCP1_x, apexCP1_y, apexCP2_x, apexCP2_y, apexP_x, apexP_y,
        endCP1_x, endCP1_y, endCP2_x, endCP2_y, endP_x, endP_y) {

        this.xNoiseVal = noise(numLayers)           // since numLayers is generated from noise,
        this.numLayers = noise(this.xNoiseVal);     // we are just using it like a fractal
        this.xNoiseVal
        this.startP_x = startP_x;
        this.startP_y = startP_y;

        // ensure no zeroes and that it doesn't basically vacate the canvas

        // // apex control points
        // this.apexCP1_x = apexCP1_x;
        // this.apexCP1_y = apexCP1_y;
        // this.apexCP2_x = apexCP2_x;
        // this.apexCP2_y = apexCP2_y;

        // // apex point
        // this.apex_x = apexP_x;
        // this.apex_y = apexP_y;

        // end control points
        this.endCP1_x = endCP1_x;
        this.endCP1_y = endCP1_y;
        this.endCP2_x = endCP2_x;
        this.endCP2_y = endCP2_y;

        // end point
        this.endP_x = endP_x;
        this.endP_y = endP_y;

    }

    pointsTester(bool = true) {

        if (bool == true) {

            noFill();

            stroke(250, 100, 100);
            strokeWeight(10);
            point(this.startP_x, this.startP_y);

            // stroke(100, 100, 250);
            // strokeWeight(5);
            // point(this.apexCP1_x, this.apexCP1_y);
            // point(this.apexCP2_x, this.apexCP2_y);

            // stroke(250, 100, 100);
            // strokeWeight(10);
            // point(this.apex_x, this.apex_y);

            stroke(100, 100, 250);
            strokeWeight(5);
            point(this.endCP1_x, this.endCP1_y);
            point(this.endCP2_x, this.endCP2_y);

            stroke(250, 100, 100);
            strokeWeight(10);
            point(this.endP_x, this.endP_y);

            stroke(0, 250, 0);
            strokeWeight(2);
            line(this.startP_x, this.startP_y,
                // this.apexCP1_x, this.apexCP1_y
                this.endCP1_x, this.endCP1_y
            );
            // line(this.apexCP2_x, this.apexCP2_y, this.apex_x, this.apex_y);
            // line(this.apex_x, this.apex_y, this.endCP1_x, this.endCP1_y);
            line(this.endCP2_x, this.endCP2_y, this.endP_x, this.endP_y);

            strokeWeight(2);
            stroke(0, 50);
            // let testmod = -10;
            // this.createLayer(this.startP_x + (testmod * noise(1)), this.startP_y + (testmod * noise(1)), this.apexCP1_x + (testmod * noise(1)), this.apexCP1_y + (testmod * noise(1)), this.apexCP2_x + (testmod * noise(1)), this.apexCP2_y + (testmod * noise(1)), this.apex_x + (testmod * noise(1)), this.apex_y + (testmod * noise(1)), this.endCP1_x + (testmod * noise(1)), this.endCP1_y + (testmod * noise(1)), this.endCP2_x + (testmod * noise(1)), this.endCP2_y + (testmod * noise(1)), this.endP_x + (testmod * noise(1)), this.endP_y + (testmod * noise(1)));

        }
        // noFill();
        this.createLayer(this.startP_x, this.startP_y,
            //     //  this.apexCP1_x, this.apexCP1_y, this.apexCP2_x, this.apexCP2_y, this.apex_x, this.apex_y,
            this.endCP1_x, this.endCP1_y, this.endCP2_x, this.endCP2_y, this.endP_x, this.endP_y);

        fill(0);
        noStroke();
        text('start', this.startP_x, this.startP_y)
        // text('apex cp 1', this.apexCP1_x, this.apexCP1_y)
        // text('apex cp 2', this.apexCP2_x, this.apexCP2_y)
        // text('apex', this.apex_x, this.apex_y)
        text('end cp 1', this.endCP1_x, this.endCP1_y)
        text('end cp 2', this.endCP2_x, this.endCP2_y)
        text('end', this.endP_x, this.endP_y)

    }

    createLayer(startP_x, startP_y,
        // apexCP1_x, apexCP1_y, apexCP2_x, apexCP2_y, apexP_x, apexP_y,
        endCP1_x, endCP1_y, endCP2_x, endCP2_y, endP_x, endP_y) {
        beginShape();
        vertex(startP_x, startP_y);
        // bezierVertex(apexCP1_x, apexCP1_y, apexCP2_x, apexCP2_y, apexP_x, apexP_y);
        bezierVertex(endCP1_x, endCP1_y, endCP2_x, endCP2_y, endP_x, endP_y);
        endShape();
    }

    createAllLayers(startRange, endRange) {

        // to properly instantiate, they need be shifted based on distPerLayer
        noFill();

        // console.log(`startRange: ${startRange}, endRange: ${endRange}`);
        // console.log(`this.numLayers: ${this.numLayers}`);

        if (endRange >= 0) {
            for (let i = 0; i < this.numLayers; i++) {
                let noiseValAt_i = noise(0.1 * i);
                // console.log(`noiseValAt_i: ${noiseValAt_i}`);
                strokeWeight(1.5 - noiseValAt_i);
                stroke(350, map(noiseValAt_i, 0, 1, 0, 100));

                this.createLayer(
                    this.startP_x, map(this.startP_y * noiseValAt_i, 0, this.startP_y, this.startP_y, this.startP_y + startRange),
                    // this.apexCP1_x, this.apexCP1_y + (endRange * noiseValAt_i * i),
                    // this.apexCP2_x, this.apexCP2_y + (endRange * noiseValAt_i * i),
                    // this.apex_x, this.apex_y + (endRange * noiseValAt_i * i),
                    this.endCP1_x, map(this.endCP1_y * noiseValAt_i, 0, this.endCP1_y, this.endCP1_y, this.endCP1_y + startRange),
                    this.endCP2_x, map(this.endCP2_y * noiseValAt_i, 0, this.endCP2_y, this.endCP2_y, this.endCP2_y + endRange),
                    this.endP_x, map(this.endP_y * noiseValAt_i, 0, this.endP_y, this.endP_y, this.endP_y + endRange)
                );
            }
        } else {
            for (let i = 0; i < this.numLayers; i++) {
                let noiseValAt_i = noise(0.1 * i);
                // console.log(`noiseValAt_i: ${noiseValAt_i}`);
                strokeWeight(1.5 - noiseValAt_i);

                this.createLayer(
                    this.startP_x, map(this.startP_y * noiseValAt_i, 0, this.startP_y, this.startP_y + startRange, this.startP_y),
                    // this.apexCP1_x, this.apexCP1_y + (endRange * noiseValAt_i * i),
                    // this.apexCP2_x, this.apexCP2_y + (endRange * noiseValAt_i * i),
                    // this.apex_x, this.apex_y + (endRange * noiseValAt_i * i),
                    this.endCP1_x, map(this.endCP1_y * noiseValAt_i, 0, this.endCP1_y, this.endCP1_y + startRange, this.endCP1_y),
                    this.endCP2_x, map(this.endCP2_y * noiseValAt_i, 0, this.endCP2_y, this.endCP2_y + endRange, this.endCP2_y),
                    this.endP_x, map(this.endP_y * noiseValAt_i, 0, this.endP_y, this.endP_y + endRange, this.endP_y)
                );
            }
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


function windowResized() {

    c_width = cnvContainer.offsetWidth;
    c_height = cnvContainer.offsetHeight;
    resizeCanvas(c_width, c_height);

    cluster1 = new Cluster(
        lpcArray[0],
        canvas.width * 0 / 12, canvas.height * 3 / 12,
        canvas.width * 7 / 12, canvas.height * 1 / 12,
        canvas.width * 9 / 12, canvas.height * 12 / 12,
        canvas.width * 12 / 12, canvas.height * 13 / 12
    );

    // console.log('HI')
    cluster2 = new Cluster(
        lpcArray[1],
        canvas.width * 0 / 12, canvas.height * 4 / 12,
        canvas.width * 8 / 12, canvas.height * 3 / 12,
        canvas.width * 9 / 12, canvas.height * 9 / 12,
        canvas.width * 12 / 12, canvas.height * 10 / 12
    );

    cluster3 = new Cluster(
        lpcArray[2],
        canvas.width * 0 / 12, canvas.height * 10 / 12,
        canvas.width * 8 / 12, canvas.height * 10 / 12,
        canvas.width * 9 / 12, canvas.height * 20 / 12,
        canvas.width * 12 / 12, canvas.height * 20 / 12
    );

}


function draw() {

    clear();

    stroke(350, 50);
    cluster1.createAllLayers(-canvas.height/2, -canvas.height);

    // cluster2.pointsTester(true)
    cluster2.createAllLayers(canvas.height/2, canvas.height/2);

    // cluster3.pointsTester(true)
    cluster3.createAllLayers(canvas.height/3, canvas.height/3);

    // cluster1.pointsTester(true);
    // cluster2.pointsTester(true);
    // cluster3.pointsTester(true);

}
