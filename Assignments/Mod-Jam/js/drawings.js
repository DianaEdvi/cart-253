"use strict";

let outlineActive = false;

let buttons = {
    play: {
        x: 720,
        y: 405,
        w: 400,
        h: 200,
        txt: "PLAY",
        txtSize: 100,
        state: "title",
        key: 0
    },
    menuChoose: {
        x: 150,
        y: 700,
        w: 150,
        h: 80,
        txt: "Menu",
        txtSize: 32,
        state: "choose",
        key: 1
    },
    ready: {
        x: 1300,
        y: 700,
        w: 150,
        h: 80,
        txt: "Ready!",
        txtSize: 32,
        state: "choose",
        key: 2
    },
    menuDecorate: {
        x: 115,
        y: 700,
        w: 150,
        h: 80,
        txt: "Menu",
        txtSize: 32,
        state: "decorate",
        key: 3
    }, finished: {
        x: 1325,
        y: 700,
        w: 150,
        h: 80,
        txt: "Finished!",
        txtSize: 32,
        state: "decorate",
        key: 4
    },
    playAgain: {
        x: 720,
        y: 405,
        w: 500,
        h: 200,
        txt: "PLAY AGAIN!",
        txtSize: 80,
        state: "finished",
        key: 5
    }
}

let readyStr = "Ready!";


function drawCircle() {
    push();
    noStroke();
    fill("red");
    ellipse(circleeee.x, circleeee.y, circleeee.size);
    pop();
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Draws the background image, consisting of the frog's house
 * @param light the lightest shade in the pallett
 * @param midLight the second-lightest shade in the pallette
 * @param mid the mid-tone in the pallette
 * @param midDark the second-darkest shade in the pallette
 * @param dark the darkest shade in the pallette
 */
function drawHouseBackground(light, midLight, mid, midDark, dark) {
    background(light);
    noStroke();

    //Draw house
    push;
    fill(midDark);
    ellipse(width / 2, height / 2 + 100, width - 200, height + 200);
    pop;

    //Draw wall
    push;
    fill(dark);
    ellipse(width / 2, height / 2 + 350, width - 300, height + 550);
    pop;

    //Draw chimney
    push;
    fill(dark);
    rectMode(CORNER);
    rect(1050, 75, 50, 75);
    pop;

    //Draw smoke
    push();
    fill(midLight);
    ellipse(1075, 55, 40);
    ellipse(1090, 20, 60);
    ellipse(1130, 0, 50);
    pop();

    //Draw water
    push();
    fill(light);
    quad(width / 4, 600, 3 * width / 4, 600, 1225, 900, 200, 900,);
    pop();

    //Draw floor
    push();
    fill(mid);
    ellipse(width / 2, height / 2 + 150, width, 200);
    pop();

    //Draw window pane
    push();
    fill(light);
    stroke(midLight);
    strokeWeight(7);
    ellipse(width / 2, height / 2 - 200, 100);
    pop();

    //Draw window frame
    push();
    fill(midLight);
    rectMode(CORNER);
    rect(width / 2 - 3.5, height / 2 - 250, 7, 100);
    rect(width / 2 - 50, height / 2 - 205, 100, 7);
    pop();

    //Draw lily pads
    push();
    fill(midLight);
    ellipse(900, 725, 100, 75);
    ellipse(450, 750, 100, 75);
    pop();

    push();
    fill(light);
    triangle(925, 725, 1000, 650, 1000, 750);
    triangle(425, 750, 375, 700, 375, 775);
    pop();
}

/**
 * Draw's the background image, consisting of the frog's tree home
 * @param light the lightest shade in the pallett
 * @param midLight the second-lightest shade in the pallette
 * @param mid the mid-tone in the pallette
 * @param midDark the second-darkest shade in the pallette
 * @param dark the darkest shade in the pallette
 */
function drawTreeBackground(light, midLight, mid, midDark, dark) {
    noStroke();
    background(light);

    //Draw bushes
    //This was fun.
    fill(dark);
    ellipse(300, 450, 100);
    ellipse(350, 450, 100);
    ellipse(500, 400, 170);
    ellipse(700, 450, 170);
    ellipse(770, 450, 170);
    ellipse(850, 400, 190);
    ellipse(1150, 490, 200);
    ellipse(1100, 490, 200);
    ellipse(1000, 490, 200);
    ellipse(1200, 475, 200);

    push();
    fill(dark);
    //Little cirlces
    ellipse(250, 450, 50);
    ellipse(225, 450, 50);
    ellipse(270, 420, 50);
    ellipse(350, 400, 50);
    ellipse(450, 350, 50);
    ellipse(425, 350, 50);
    ellipse(460, 325, 50);
    ellipse(555, 325, 50);
    ellipse(575, 350, 50);
    ellipse(650, 375, 50);
    ellipse(750, 350, 50);
    ellipse(850, 300, 50);
    ellipse(935, 360, 50);
    ellipse(950, 400, 50);
    ellipse(1050, 400, 50);
    ellipse(1150, 400, 50);
    ellipse(1175, 400, 50);

    //Big circles
    ellipse(300, 400, 75);
    ellipse(400, 400, 75);
    ellipse(500, 300, 75);
    ellipse(600, 400, 75);
    ellipse(700, 375, 75);
    ellipse(800, 320, 75);
    ellipse(900, 320, 75);
    ellipse(1000, 400, 75);
    ellipse(1100, 375, 75);
    ellipse(1200, 350, 75);
    pop();

    //Draw ground
    push();
    fill(mid);
    ellipse(width / 2, height / 2 + 250, width, 500);
    pop();

    //Draw pond
    push();
    fill(light);
    ellipse(550, 600, 275, 100);
    pop();

    //Draw lilypad
    push();
    fill(midLight);
    ellipse(580, 600, 75, 40);
    pop();

    push();
    fill(light);
    triangle(570, 600, 500, 575, 450, 625);
    pop();

    //Draw tree trunk
    push();
    fill(midDark);
    rectMode(CORNER);
    rect(250, 50, 100, height - 100, 20);
    rect(1150, 75, 100, height - 100, 20);
    pop();

    //Draw leaves
    push();
    fill(dark);
    ellipse(300, 100, 400);
    ellipse(1200, 200, 300);
    pop();

    //Draw sun
    push();
    fill(midLight);
    ellipse(900, 100, 100);
    pop();
}


function drawUI() {
    //Draw side of game UI
    push();
    noStroke();
    fill("blue");
    rectMode(CORNER);
    rect(width - 225, 0, 230, height);
    rect(0, 0, 230, height);
    pop();

    drawButton(buttons.menuDecorate);
    drawButton(buttons.finished);
}

function drawSelections() {
    let backgroundStr = "Select a background to decorate";
    let colorStr = "And a color palette";
    // let menuTxt = "Menu";
    background("#96beb1");

    drawButton(buttons.menuChoose);
    drawButton(buttons.ready);

    //Draw text
    push();
    textAlign(CENTER);
    textSize(32);
    stroke("black");
    strokeWeight(2);
    text(backgroundStr, width / 2, 100);
    text(colorStr, width / 2, 575);
    pop();

    //Draw images
    push();
    imageMode(CENTER);
    image(images.img1.img, images.img1.x, images.img1.y, images.img1.w, images.img1.h);
    image(images.img2.img, images.img2.x, images.img2.y, images.img2.w, images.img2.h);
    image(images.img3.img, images.img3.x, images.img3.y, images.img3.w, images.img3.h);
    image(images.img4.img, images.img4.x, images.img4.y, images.img4.w, images.img4.h);
    image(images.img5.img, images.img5.x, images.img5.y, images.img5.w, images.img5.h);
    pop();
}

function drawOutlines(background) {
    push();
    stroke("black");
    strokeWeight(5);
    noFill();
    rectMode(CENTER);
    if (background === "left") {
        rect(images.img1.x, images.img1.y, images.img1.w, images.img1.h);
    } else if (background === "right") {
        rect(images.img2.x, images.img2.y, images.img2.w, images.img2.h);
    }

    if (colorSelect === "purple") {
        rect(images.img3.x, images.img3.y, images.img3.w, images.img3.h);
    } else if (colorSelect === "green") {
        rect(images.img4.x, images.img4.y, images.img4.w, images.img4.h);
    } else if (colorSelect === "blue") {
        rect(images.img5.x, images.img5.y, images.img5.w, images.img5.h);
    }
    pop();
}

function drawMenu() {
    background("#96beb1");
    drawButton(buttons.play);
}

function drawEnd() {
    background("black");
    drawButton(buttons.playAgain);

}

function drawButton(button) {
    push();
    //Draw rect
    rectMode(CENTER);
    fill("#fda9a9");
    rect(button.x, button.y, button.w, button.h, 20);

    //Draw text
    textAlign(CENTER, CENTER);
    textSize(button.txtSize);
    stroke("black");
    strokeWeight(2);
    fill("#96beb1");
    text(button.txt, button.x, button.y);
    pop();

    buttonHandler(button);
}

//IDK wtf is going on over here
function buttonHandler(button) {
    const minX = button.x - button.w / 2;
    const maxX = button.x + button.w / 2;
    const minY = button.y - button.h / 2;
    const maxY = button.y + button.h / 2;

    //Button handling (play)
    if (mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY && clicked === true) {
        if (button.key === 0) {
            state = "choose";
        } else if (button.key === 1) {
            state = "title";
            resetGame();
        } else if (button.key === 2) {
            console.log("clickeddd");
            state = "decorate";
        } else if (button.key === 3) {
            state = "title";
            resetGame();
        } else if (button.key === 4) {
            console.log("boooo");
            state = "finished";
        } else if (button.key === 5) {
            state = "title";
            resetGame();
        }
    }
    clicked = false;

}
