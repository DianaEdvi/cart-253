"use strict";


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
    },
    goOutside: {
        x: 115,
        y: 100,
        w: 150,
        h: 150,
        txt: "Go \nOutside",
        txtSize: 32,
        state: "finished",
        key: 6
    },
    goInside: {
        x: 1300,
        y: 710,
        w: 150,
        h: 150,
        txt: "Go \ninside",
        txtSize: 32,
        state: "decorate",
        key: 7
    }
}

const UI = {
    frogUI: {
        bar: {
            x: 720,
            y: 710,
            w: 1440,
            h: 200
        },
        txt: {
            x: 720,
            y: 710,
            size: 50,
            txt: " = "
        },
        fly: {
            x: 650,
            y: 710,
            w: 200,
            h: 200,
            img: ""
        }
    },
    decoUI: {
        leftBar: {
            x: 0,
            y: 0,
            w: 230,
            h: 810,
            fill: "#40985e",
            panel: {
                x: 115,
                y: 417,
                w: 200,
                h: 450,
                fill: "#ebf9ff",
                trashcan: {
                    x: 115,
                    y: 500,
                    w: 400,
                    h: 400,
                    img: ""
                }, fly: {
                    x: 60,
                    y: 300,
                    w: 200,
                    h: 200,
                    img: ""
                },
                txt: {
                    x: 130,
                    y: 300,
                    txt: " =   0"
                }
            }
        },
        rightBar: {
            x: 1210,
            y: 0,
            w: 230,
            h: 810,
            fill: "#40985e",
            panel: {
                x: 1325,
                y: 417,
                w: 200,
                h: 450,
                fill: "#ebf9ff",
            },
            label: {
                panel: {
                    x: 1325,
                    y: 100,
                    w: 150,
                    h: 100,
                    fill: "#082b15"
                },
                txt: {
                    x: 1325,
                    y: 100,
                    fill: "#ebf9ff",
                    size: 32,
                    txt: "SHOP"
                }
            }
        }
    }
}

// let readyStr = "Ready!";


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

function drawFrogUI() {
    //Draw bottom bar
    push();
    fill("#40985e");
    rectMode(CENTER);
    rect(UI.frogUI.bar.x, UI.frogUI.bar.y, UI.frogUI.bar.w, UI.frogUI.bar.h);
    pop();

    //Draw button
    drawButton(buttons.goInside);

    //Display flies caught text and image
    push();
    fill("#18284a")
    stroke(2);
    textAlign(CENTER, CENTER);
    textSize(UI.frogUI.txt.size);
    text(UI.frogUI.txt.txt + fliesCaught, UI.frogUI.txt.x, UI.frogUI.txt.y);
    imageMode(CENTER);
    image(UI.frogUI.fly.img, UI.frogUI.fly.x, UI.frogUI.fly.y, UI.frogUI.fly.w, UI.frogUI.fly.h);
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

function drawDecoUI() {

    //Draw left side of game UI

    //Draw sidebar
    drawSideBar(UI.decoUI.leftBar);
    //Draw white panel
    drawPanel(UI.decoUI.leftBar.panel);

    //Draw panel's contents
    push();
    fill("black")
    textSize(32);
    strokeWeight(2);
    imageMode(CENTER);
    image(UI.decoUI.leftBar.panel.trashcan.img, UI.decoUI.leftBar.panel.trashcan.x, UI.decoUI.leftBar.panel.trashcan.y, UI.decoUI.leftBar.panel.trashcan.w, UI.decoUI.leftBar.panel.trashcan.h);
    image(UI.decoUI.leftBar.panel.fly.img, UI.decoUI.leftBar.panel.fly.x, UI.decoUI.leftBar.panel.fly.y, UI.decoUI.leftBar.panel.fly.w, UI.decoUI.leftBar.panel.fly.h);
    textAlign(CENTER, CENTER);
    text(UI.decoUI.leftBar.panel.txt.txt, UI.decoUI.leftBar.panel.txt.x, UI.decoUI.leftBar.panel.txt.y);
    pop();


    //Draw right side of game UI

    //Draw sidebar
    drawSideBar(UI.decoUI.rightBar);
    //Draw white panel
    drawPanel(UI.decoUI.rightBar.panel);
    //Draw shop label panel
    drawPanel(UI.decoUI.rightBar.label.panel);


    //Draw shop text
    push();
    textAlign(CENTER, CENTER);
    textSize(UI.decoUI.rightBar.label.txt.size);
    fill(UI.decoUI.rightBar.label.txt.fill);
    text(UI.decoUI.rightBar.label.txt.txt, UI.decoUI.rightBar.label.txt.x, UI.decoUI.rightBar.label.txt.y);
    pop();


    drawButton(buttons.goOutside);
    drawButton(buttons.menuDecorate); //When these are swapped, menu also doesnt work
    drawButton(buttons.finished);
}

function drawSideBar(sidebar) {
    push();
    noStroke();
    fill(sidebar.fill);
    rectMode(CORNER);
    rect(sidebar.x, sidebar.y, sidebar.w, sidebar.h);
    pop();

}

function drawPanel(panel) {
    push();
    noStroke();
    rectMode(CENTER);
    fill(panel.fill);
    rect(panel.x, panel.y, panel.w, panel.h, 20);
    pop();
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

"#ebf9ff"
"#87a9c5"
"#52a5de"
"#18284a"
"#070810"
"#d1cb95"
"#40985e"
"#1a644e"
"#04373b"
"#0a1a2f"
"#f4c4d4"
"#ea92ab"
"#af7fc2"
"#8c76be"
"#61567d"
"#d5d5d5"
"#b0b0b0"
"#878787"
"#5b5b5b"
"#3a3a3a"
"#fda9a9"
"#f3eded"
"#b9eedc"
"#96beb1"
"#586c78"