"use strict";
//Base information for each decoration object
let decorations = {
    vaseTall: {
        x: 720, // the x coordinate of the decoration
        y: 405, // the y coordinate of the decoration
        w: 200, // the width of the decoration
        h: 200, // the height of the decoration
        img: "", // the variable holding the image
        dragging: false, // checks whether the object is being dragged
        colorVariations: [], // holds the color variations of the object
        currentVariation: 0, // holds the index of the current color variation
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1210,
                y: 195,
                w: 115,
                h: 115
            },
            var1: {
                img: "",
                x: 1225,
                y: 295,
                w: 90,
                h: 90,
            },
            var2: {
                img: "",
                x: 1225,
                y: 370,
                w: 90,
                h: 90,
            },
            var3: {
                img: "",
                x: 1225,
                y: 445,
                w: 90,
                h: 90,
            }
        }
    },
    vaseShort: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1210,
                y: 195,
                w: 115,
                h: 115
            },
            var1: {
                img: "",
                x: 1225,
                y: 295,
                w: 90,
                h: 90,
            },
            var2: {
                img: "",
                x: 1225,
                y: 370,
                w: 90,
                h: 90,
            },
            var3: {
                img: "",
                x: 1225,
                y: 445,
                w: 90,
                h: 90,
            }
        }
    },
    fishBowl: {
        x: 720,
        y: 405,
        w: 150,
        h: 150,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1195,
                y: 180,
                w: 140,
                h: 140
            },
            var1: {
                img: "",
                x: 1205,
                y: 275,
                w: 125,
                h: 125,
            },
            var2: {
                img: "",
                x: 1205,
                y: 350,
                w: 125,
                h: 125,
            },
            var3: {
                img: "",
                x: 1205,
                y: 425,
                w: 125,
                h: 125,
            }
        }
    },
    fishTank: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1207,
                y: 190,
                w: 120,
                h: 120
            },
            var1: {
                img: "",
                x: 1205,
                y: 275,
                w: 125,
                h: 125,
            },
            var2: {
                img: "",
                x: 1205,
                y: 350,
                w: 125,
                h: 125,
            },
            var3: {
                img: "",
                x: 1205,
                y: 425,
                w: 125,
                h: 125,
            }
        }
    },
    tableShort: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1205,
                y: 180,
                w: 130,
                h: 130
            },
            var1: {
                img: "",
                x: 1210,
                y: 275,
                w: 125,
                h: 125,
            },
            var2: {
                img: "",
                x: 1210,
                y: 350,
                w: 125,
                h: 125,
            },
            var3: {
                img: "",
                x: 1210,
                y: 425,
                w: 125,
                h: 125,
            }
        }
    },
    tableLong: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1222,
                y: 205,
                w: 90,
                h: 90
            },
            var1: {
                img: "",
                x: 1223,
                y: 283,
                w: 100,
                h: 100,
            },
            var2: {
                img: "",
                x: 1223,
                y: 358,
                w: 100,
                h: 100,
            },
            var3: {
                img: "",
                x: 1223,
                y: 433,
                w: 100,
                h: 100,
            }
        }
    },
    rugCircle: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1217,
                y: 195,
                w: 100,
                h: 100
            },
            var1: {
                img: "",
                x: 1220,
                y: 275,
                w: 110,
                h: 110,
            },
            var2: {
                img: "",
                x: 1220,
                y: 350,
                w: 110,
                h: 110,
            },
            var3: {
                img: "",
                x: 1220,
                y: 425,
                w: 110,
                h: 110,
            }
        }
    },
    rugLong: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1227,
                y: 205,
                w: 80,
                h: 80
            },
            var1: {
                img: "",
                x: 1227,
                y: 285,
                w: 90,
                h: 90,
            },
            var2: {
                img: "",
                x: 1227,
                y: 360,
                w: 90,
                h: 90,
            },
            var3: {
                img: "",
                x: 1227,
                y: 435,
                w: 90,
                h: 90,
            }
        }
    },
    miscSnail: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1195,
                y: 170,
                w: 150,
                h: 150
            },
            var1: {
                img: "",
                x: 1205,
                y: 265,
                w: 135,
                h: 135,
            },
            var2: {
                img: "",
                x: 1205,
                y: 340,
                w: 135,
                h: 135,
            },
            var3: {
                img: "",
                x: 1205,
                y: 415,
                w: 135,
                h: 135,
            }
        }
    },
    miscStatue: {
        x: 720,
        y: 405,
        w: 200,
        h: 200,
        img: "",
        dragging: false,
        colorVariations: [],
        currentVariation: 0,
        shopSprites: {
            mainSprite: {
                img: "",
                x: 1195,
                y: 180,
                w: 140,
                h: 140
            },
            var1: {
                img: "",
                x: 1205,
                y: 275,
                w: 125,
                h: 125,
            },
            var2: {
                img: "",
                x: 1205,
                y: 350,
                w: 125,
                h: 125,
            },
            var3: {
                img: "",
                x: 1205,
                y: 425,
                w: 125,
                h: 125,
            }
        }
    },
}

let decoObjects = [];
let shopItems = [];

function setupDecoratingGame() {
    //Assign all sprites for the shop
    //Tall vase
    decorations.vaseTall.shopSprites.mainSprite.img = decorations.vaseTall.colorVariations[0];
    decorations.vaseTall.shopSprites.var1.img = decorations.vaseTall.colorVariations[0];
    decorations.vaseTall.shopSprites.var2.img = decorations.vaseTall.colorVariations[1];
    decorations.vaseTall.shopSprites.var3.img = decorations.vaseTall.colorVariations[2];
    //Short vase
    decorations.vaseShort.shopSprites.mainSprite.img = decorations.vaseShort.colorVariations[0];
    decorations.vaseShort.shopSprites.var1.img = decorations.vaseShort.colorVariations[0];
    decorations.vaseShort.shopSprites.var2.img = decorations.vaseShort.colorVariations[1];
    decorations.vaseShort.shopSprites.var3.img = decorations.vaseShort.colorVariations[2];

    //Fishbowl
    decorations.fishBowl.shopSprites.mainSprite.img = decorations.fishBowl.colorVariations[0];
    decorations.fishBowl.shopSprites.var1.img = decorations.fishBowl.colorVariations[0];
    decorations.fishBowl.shopSprites.var2.img = decorations.fishBowl.colorVariations[1];
    decorations.fishBowl.shopSprites.var3.img = decorations.fishBowl.colorVariations[2];

    //Fishtank
    decorations.fishTank.shopSprites.mainSprite.img = decorations.fishTank.colorVariations[0];
    decorations.fishTank.shopSprites.var1.img = decorations.fishTank.colorVariations[0];
    decorations.fishTank.shopSprites.var2.img = decorations.fishTank.colorVariations[1];
    decorations.fishTank.shopSprites.var3.img = decorations.fishTank.colorVariations[2];

    //Table short
    decorations.tableShort.shopSprites.mainSprite.img = decorations.tableShort.colorVariations[0];
    decorations.tableShort.shopSprites.var1.img = decorations.tableShort.colorVariations[0];
    decorations.tableShort.shopSprites.var2.img = decorations.tableShort.colorVariations[1];
    decorations.tableShort.shopSprites.var3.img = decorations.tableShort.colorVariations[2];

    //Table long
    decorations.tableLong.shopSprites.mainSprite.img = decorations.tableLong.colorVariations[0];
    decorations.tableLong.shopSprites.var1.img = decorations.tableLong.colorVariations[0];
    decorations.tableLong.shopSprites.var2.img = decorations.tableLong.colorVariations[1];
    decorations.tableLong.shopSprites.var3.img = decorations.tableLong.colorVariations[2];

    //Rug circle
    decorations.rugCircle.shopSprites.mainSprite.img = decorations.rugCircle.colorVariations[0];
    decorations.rugCircle.shopSprites.var1.img = decorations.rugCircle.colorVariations[0];
    decorations.rugCircle.shopSprites.var2.img = decorations.rugCircle.colorVariations[1];
    decorations.rugCircle.shopSprites.var3.img = decorations.rugCircle.colorVariations[2];

    //Rug long
    decorations.rugLong.shopSprites.mainSprite.img = decorations.rugLong.colorVariations[0];
    decorations.rugLong.shopSprites.var1.img = decorations.rugLong.colorVariations[0];
    decorations.rugLong.shopSprites.var2.img = decorations.rugLong.colorVariations[1];
    decorations.rugLong.shopSprites.var3.img = decorations.rugLong.colorVariations[2];

    //Snail clock
    decorations.miscSnail.shopSprites.mainSprite.img = decorations.miscSnail.colorVariations[0];
    decorations.miscSnail.shopSprites.var1.img = decorations.miscSnail.colorVariations[0];
    decorations.miscSnail.shopSprites.var2.img = decorations.miscSnail.colorVariations[1];
    decorations.miscSnail.shopSprites.var3.img = decorations.miscSnail.colorVariations[2];

    //Grandma statue
    decorations.miscStatue.shopSprites.mainSprite.img = decorations.miscStatue.colorVariations[0];
    decorations.miscStatue.shopSprites.var1.img = decorations.miscStatue.colorVariations[0];
    decorations.miscStatue.shopSprites.var2.img = decorations.miscStatue.colorVariations[1];
    decorations.miscStatue.shopSprites.var3.img = decorations.miscStatue.colorVariations[2];

    block.price.flyImg.img = UI.decoUI.leftBar.panel.fly.img;

    shopItems.push(new ShopItem(block, decorations.vaseTall.shopSprites));
    shopItems.push(new ShopItem(block, decorations.vaseShort.shopSprites));
    shopItems.push(new ShopItem(block, decorations.fishBowl.shopSprites));
    shopItems.push(new ShopItem(block, decorations.fishTank.shopSprites));
    shopItems.push(new ShopItem(block, decorations.tableShort.shopSprites));
    shopItems.push(new ShopItem(block, decorations.tableLong.shopSprites));
    shopItems.push(new ShopItem(block, decorations.rugCircle.shopSprites));
    shopItems.push(new ShopItem(block, decorations.rugLong.shopSprites));
    shopItems.push(new ShopItem(block, decorations.miscSnail.shopSprites));
    shopItems.push(new ShopItem(block, decorations.miscStatue.shopSprites));

}

/**
 * Preloads all the images used by the decoration game
 */
function preloadDecoration() {
    //Preload UI images
    UI.decoUI.leftBar.panel.fly.img = loadImage("assets/images/decorations/fly.png");
    UI.decoUI.leftBar.panel.trashcan.img = loadImage("assets/images/decorations/garbage.png");

    //Preload decoration images
    decorations.vaseTall.colorVariations = [
        loadImage("assets/images/decorations/vase_tall_1.png"),
        loadImage("assets/images/decorations/vase_tall_2.png"),
        loadImage("assets/images/decorations/vase_tall_3.png"),
    ]
    decorations.vaseShort.colorVariations = [
        loadImage("assets/images/decorations/vase_short_1.png"),
        loadImage("assets/images/decorations/vase_short_2.png"),
        loadImage("assets/images/decorations/vase_short_3.png"),
    ]
    decorations.fishBowl.colorVariations = [
        loadImage("assets/images/decorations/fishbowl_1.png"),
        loadImage("assets/images/decorations/fishbowl_2.png"),
        loadImage("assets/images/decorations/fishbowl_3.png"),
    ]
    decorations.fishTank.colorVariations = [
        loadImage("assets/images/decorations/fishTank_1.png"),
        loadImage("assets/images/decorations/fishTank_2.png"),
        loadImage("assets/images/decorations/fishTank_3.png"),
    ]
    decorations.miscStatue.colorVariations = [
        loadImage("assets/images/decorations/grandma_statue_1.png"),
        loadImage("assets/images/decorations/grandma_statue_2.png"),
        loadImage("assets/images/decorations/grandma_statue_3.png"),
    ]
    decorations.miscSnail.colorVariations = [
        loadImage("assets/images/decorations/snail_clock_1.png"),
        loadImage("assets/images/decorations/snail_clock_2.png"),
        loadImage("assets/images/decorations/snail_clock_3.png"),
    ]
    decorations.rugCircle.colorVariations = [
        loadImage("assets/images/decorations/rug_circle_1.png"),
        loadImage("assets/images/decorations/rug_circle_2.png"),
        loadImage("assets/images/decorations/rug_circle_3.png"),
    ]
    decorations.rugLong.colorVariations = [
        loadImage("assets/images/decorations/rug_long_1.png"),
        loadImage("assets/images/decorations/rug_long_2.png"),
        loadImage("assets/images/decorations/rug_long_3.png"),
    ]
    decorations.tableLong.colorVariations = [
        loadImage("assets/images/decorations/table_long_1.png"),
        loadImage("assets/images/decorations/table_long_2.png"),
        loadImage("assets/images/decorations/table_long_3.png"),
    ]
    decorations.tableShort.colorVariations = [
        loadImage("assets/images/decorations/table_short_1.png"),
        loadImage("assets/images/decorations/table_short_2.png"),
        loadImage("assets/images/decorations/table_short_3.png"),
    ]
}

/**
 * Draw's the decoration objects and UI onto the screen
 */
function drawDecoration() {
    setBackground();
    drawDecoUI();
    for (let deco of decoObjects) {
        deco.updatePosition();
    }

    for (let shopItem of shopItems) {
        shopItem.draw();
    }

}

/**
 * Creates a new decoration object
 * @param decoration the type of decoration object
 * @param colorVariations the object's color variations
 * @param index the index of the color selected
 */
function createNewDecoration(decoration, colorVariations, index) {
    //Create a new decoration at the center of the screen
    let newDeco = new Decoration(decoration, colorVariations);
    newDeco.changeColor(index);
    decoObjects.push(newDeco);
}

/**
 * Temporary
 */
function keyPressed() {
    if (key === ' ') {
        createNewDecoration(decorations.fishBowl, decorations.fishBowl.colorVariations, 0);
    } else if (key === 'r') {
        createNewDecoration(decorations.rugLong, decorations.rugLong.colorVariations, 1);
    } else if (key === 'e') {
        createNewDecoration(decorations.tableLong, decorations.tableLong.colorVariations, 2);
    }
}


/**
 * Class for a Decoration object
 * Creates a new Decoration object and displays it onto the screen
 * Checks if the mouse is over and pressing the decoration object and drags and drops accordingly
 */
class Decoration {

    //Construct a new decoration object
    constructor(decoration, colorVariations) {
        this.x = decoration.x;
        this.y = decoration.y;
        this.w = decoration.w;
        this.h = decoration.h;
        this.colorVariations = colorVariations;
        this.currentVariation = decoration.currentVariation;
    }

    //Display the object onto the screen
    display() {
        imageMode(CENTER);
        image(this.colorVariations[this.currentVariation], this.x, this.y, this.w, this.h);
    }

    // Check if the mouse is over the decoration (bad version, but acceptable)
    isMouseOver() {
        return mouseX > this.x - this.w / 4 && mouseX < this.x + this.w / 4 &&
            mouseY > this.y - this.h / 4 && mouseY < this.y + this.h / 4;
    }

    // Start dragging
    startDrag() {
        if (this.isMouseOver()) {
            this.dragging = true;
        }
    }

    // Stop dragging
    stopDrag() {
        this.dragging = false;
    }

    // Update the position if being dragged
    updatePosition() {
        if (this.dragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        this.display();
    }

    changeColor(index) {
        if (index >= 0 && index < 3) {
            this.currentVariation = index;
        }
    }

}

let selectedDeco = null;


/**
 * Iterates through the decoration objects in LIFO order because this is the order that they appear on the screen
 * Checks if mouse is over an object and if so gives it higher draw priority (draws on top of other items)
 * Then it implements the drag function
 */
function mousePressedDecorate() {
    // Iterate through decoObjects in reverse order so that the last drawn object is what is selected
    for (let i = decoObjects.length - 1; i >= 0; i--) {
        let deco = decoObjects[i];
        if (deco.isMouseOver()) {
            selectedDeco = deco; // Store the topmost decoration

            // Remove selectedDeco from its current position
            decoObjects.splice(i, 1);
            // Add it to the end of the array (this gives it higher draw priority)
            decoObjects.push(selectedDeco);
            deco.startDrag();
            break; // Exit loop after selecting one
        }
    }
}

/**
 * Checks if the selected object is not null and freezes its position once the mouse is released
 * Also checks if the released location is over the trashcan and deletes it if it is
 */
function mouseReleasedDecorate() {
    //If selected decoration is not null, stop dragging it
    if (selectedDeco) {
        selectedDeco.stopDrag();
        selectedDeco = null; // Reset selected decoration to null
    }

    //If mouse is over trashcan, delete object
    destroyDecoration(decoObjects.indexOf(selectedDeco));
}

/**
 * Destroys a Decoration object upon placing it within the bounds of the trashcan
 * @param index the index of the object to be deleted
 */
function destroyDecoration(index) {
    //Calculate the area of the trashcan
    if (mouseX > UI.decoUI.leftBar.panel.trashcan.x - UI.decoUI.leftBar.panel.trashcan.w / 2
        && mouseX < UI.decoUI.leftBar.panel.trashcan.x + UI.decoUI.leftBar.panel.trashcan.w / 2
        && mouseY > UI.decoUI.leftBar.panel.trashcan.y - UI.decoUI.leftBar.panel.trashcan.h / 2
        && mouseY < UI.decoUI.leftBar.panel.trashcan.y + UI.decoUI.leftBar.panel.trashcan.h / 2) {
        //Delete the object
        decoObjects.splice(index, 1);
    } else if (state === "title") {
        decoObjects.splice(index, 1);
    }
}

function mouseWheel(event) {
    if (event.delta > 0) {
        UI.decoUI.rightBar.scrollWheel.bar.y += 1;
        console.log("scrolling down");
    } else {
        UI.decoUI.rightBar.scrollWheel.bar.y -= 1;
        console.log("scrolling up");
    }

}






