/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";


// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
    },
};

//Defines values for random function
let shake = {
    maxShakeLow: 0,
    maxShakeHigh: 0
}

// The sky
let sky = {
    fill: {
        r: 160,
        g: 180,
        b: 200
    }
}

let bird = {
    //Position and size
    x: 0,
    y: 150,
    w: 75,
    h: 50,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
    },
    velocity : {
        x: 1,
    },
    minVelocity : {
        x: -3,
    },
    maxVelocity : {
        x: 4,
    },
    acceleration: {
        x: 0.025,
    }
}

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    background(sky.fill.r, sky.fill.g, sky.fill.b);

    //Make mr furious red over time
    push();
    mrFurious.fill.g--;
    mrFurious.fill.b--;
    mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 255);
    mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);
    pop();

    //Make the sky black over time
    push();
    sky.fill.r--;
    sky.fill.g--;
    sky.fill.b--;
    sky.fill.r = constrain(sky.fill.r, 0, 255);
    sky.fill.g = constrain(sky.fill.g, 0, 255);
    sky.fill.b = constrain(sky.fill.b, 0, 255);
    pop();

    //Make the bird move
    push();
    bird.velocity.x += bird.acceleration.x;
    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.x += bird.velocity.x;
    pop();


    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    //Make mr furious shake more over time
    shake.maxShakeLow = constrain(shake.maxShakeLow, -50, 0);
    shake.maxShakeLow -= 0.5;
    shake.maxShakeHigh = constrain(shake.maxShakeHigh, 0, 50);
    shake.maxShakeHigh += 0.5;
    //Make mr furious shake
    ellipse(mrFurious.x + random(shake.maxShakeLow, shake.maxShakeHigh), mrFurious.y + random(shake.maxShakeLow, shake.maxShakeHigh), mrFurious.size);
    pop();



    //Draw bird
    push();
    noStroke();
    fill(bird.fill.r, bird.fill.g, bird.fill.b);
    ellipse(bird.x, bird.y, bird.w, bird.h);
    pop();
}