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
    finished: {
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
        y: 700,
        w: 350,
        h: 120,
        txt: "PLAY AGAIN!",
        txtSize: 50,
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
    menuUI: {
        titleTxt: {
            x: 720,
            y: 100,
            size: 60,
            weight: 2,
            txt: "Amphibian Design",
        },
        subTxt: {
            x: 720,
            y: 200,
            size: 30,
            weight: 2,
            txt: "Collect, buy, decorate :3"
        },
        fill: "#18284a",
    },
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
                    img: "",
                    txt: {
                        x: 115,
                        y: 455,
                        size: 22,
                        weight: 2,
                        fill: "black",
                        txt: "Refunds"
                    }
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
            },
            howToPlay: {
                x: 10,
                y: 660,
                size: 18,
                weight: 1.2,
                leading: 25,
                txt: "1. Catch flies outside\n2. Buy decorations inside\n3. Decorate your house\n4. Click \"Finished\" for PDF of your creation\n5. Share with friends :)",
                fill: "#18284a",
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
            scrollWheel: {
                x: 1410,
                y: 417,
                w: 20,
                h: 430,
                fill: "#082b15",
                bar: {
                    x: 1410,
                    y: 221,
                    w: 20,
                    h: 40,
                    fill: "#96beb1"
                }
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
            },
            sneakyPanels: {
                sneakyTop: {
                    x: 1210,
                    y: 0,
                    w: 230,
                    h: 194,
                    fill: "#40985e"
                },
                sneakyBottom: {
                    x: 1210,
                    y: 635,
                    w: 230,
                    h: 192,
                    fill: "#40985e"
                }
            }
        },
        hiddenText: {
            isActive: false,
            txt: {
                txt: "Created in \"Amphibean Design\" by Diana Edvi",
                x: 1000,
                y: 797,
                size: 20,
                strokeWeight: 1,
                fill: "black"
            }

        }
    },
    endUI: {
        txt: {
            txt: "What a beautiful design!\n Click 's' or 'S' to save a PNG of your creation\nThanks for playing :)",
            x: 720,
            y: 95,
            size: 40,
            strokeWeight: 2,
            fill: "white"
        },
        png: {
            x: 720,
            y: 400,
            w: 490,
            h: 405,
            img: "",
        }
    }
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
    push();
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
    push();
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
    push();
    textSize(UI.decoUI.leftBar.panel.trashcan.txt.size);
    text(UI.decoUI.leftBar.panel.trashcan.txt.txt, UI.decoUI.leftBar.panel.trashcan.txt.x, UI.decoUI.leftBar.panel.trashcan.txt.y);
    pop();
    pop();


    //Draw right side of game UI

    //Draw sidebar
    drawSideBar(UI.decoUI.rightBar);
    //Draw white panel
    drawPanel(UI.decoUI.rightBar.panel);

    for (let i = 0; i < shopItems.length; i++) {
        shopItems[i].draw();
    }

    //Draw scroll wheel
    push();
    drawPanel(UI.decoUI.rightBar.scrollWheel);
    drawPanel(UI.decoUI.rightBar.scrollWheel.bar);
    pop();

    sneakyPanel();

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
    // drawButton(buttons.menuDecorate); //When these are swapped, menu also doesnt work
    drawButton(buttons.finished);

    //Draw how to play text
    push();
    textAlign(LEFT, CENTER);
    textSize(UI.decoUI.leftBar.howToPlay.size);
    stroke("#18284a");
    strokeWeight(UI.decoUI.leftBar.howToPlay.weight);
    textLeading(UI.decoUI.leftBar.howToPlay.leading);
    fill(UI.decoUI.leftBar.howToPlay.fill);
    text(UI.decoUI.leftBar.howToPlay.txt, UI.decoUI.leftBar.howToPlay.x, UI.decoUI.leftBar.howToPlay.y, UI.decoUI.leftBar.w - 10);
    pop();
}

function drawHiddenText() {
    if (UI.decoUI.hiddenText.isActive) {
        console.log("entereddd");
    }
    //Draw hidden text
    push();
    fill(UI.decoUI.hiddenText.txt.fill);
    textAlign(CENTER, CENTER);
    stroke("black");
    strokeWeight(UI.decoUI.hiddenText.txt.strokeWeight);
    textSize(UI.decoUI.hiddenText.txt.size);
    text(UI.decoUI.hiddenText.txt.txt, UI.decoUI.hiddenText.txt.x, UI.decoUI.hiddenText.txt.y)
    pop();
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
    background("#96beb1");

    drawButton(buttons.menuChoose);
    drawButton(buttons.ready);

    //Draw text
    push();
    textAlign(CENTER);
    textSize(32);
    stroke("black");
    strokeWeight(2);
    fill("white");
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
    push();
    background("#96beb1");
    fill(UI.menuUI.fill)
    stroke("#18284a");
    strokeWeight(UI.menuUI.titleTxt.weight);
    textAlign(CENTER, CENTER);
    push();
    pop();
    textSize(UI.menuUI.titleTxt.size);
    text(UI.menuUI.titleTxt.txt, UI.menuUI.titleTxt.x, UI.menuUI.titleTxt.y)
    push();
    textSize(UI.menuUI.subTxt.size);
    text(UI.menuUI.subTxt.txt, UI.menuUI.subTxt.x, UI.menuUI.subTxt.y)
    pop();
    pop();
    drawButton(buttons.play);
}

function drawEnd() {
    background("#586c78");

    //Draw text
    push();
    fill(UI.endUI.txt.fill);
    textAlign(CENTER, CENTER);
    stroke("black");
    strokeWeight(UI.endUI.txt.strokeWeight);
    textSize(UI.endUI.txt.size);
    text(UI.endUI.txt.txt, UI.endUI.txt.x, UI.endUI.txt.y)
    pop();

    drawPNG();
    drawButton(buttons.playAgain);
}

function drawButton(button) {
    push();
    //Draw rect
    rectMode(CENTER);
    fill("#fda9a9");
    rect(button.x, button.y, button.w, button.h, 20);
    pop();

    //Draw text
    push();
    textAlign(CENTER, CENTER);
    textSize(button.txtSize);
    stroke("black");
    strokeWeight(2);
    fill("#96beb1");
    text(button.txt, button.x, button.y);
    pop();

    buttonHandler(button);
}

function drawTemp() {
    push();
    fill("red");
    ellipse(1315, 194, 20);
    pop();
}

function sneakyPanel() {
    drawSideBar(UI.decoUI.rightBar.sneakyPanels.sneakyTop);
    drawSideBar(UI.decoUI.rightBar.sneakyPanels.sneakyBottom);
}

function drawBuyButton(button) {
    push()
    fill(button.fill);
    stroke(0);
    rectMode(CENTER);
    rect(button.x, button.y, button.w, button.h, 10);
    pop();

    push();
    fill("black");
    strokeWeight(2);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("BUY", button.x, button.y + 2);
    pop();
}

/**
 * Displays the image that will be saved by the user
 */
function drawPNG() {

    //Display image of decoration
    push();
    stroke("white");
    strokeWeight(20);
    imageMode(CENTER);
    rectMode(CENTER);
    rect(UI.endUI.png.x, UI.endUI.png.y, UI.endUI.png.w, UI.endUI.png.h);
    image(UI.endUI.png.img, UI.endUI.png.x, UI.endUI.png.y);
    pop();
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

"#587dca";