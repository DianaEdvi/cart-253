"use strict";

class ShopItem {
    constructor(block, decoration) {
        this.block = block;
        this.decoration = decoration;
    }

    draw() {
        drawShop(this.block, this.decoration);
        this.checkPrice(this.block.subBlock);
        this.displayShopSprites();
    }

    displayShopSprites() {
        push();
        imageMode(CENTER);
        //Variation sprites
        image(this.decoration.shopSprites.var1.img, this.decoration.shopSprites.var1.x, this.decoration.shopSprites.var1.y, this.decoration.shopSprites.var1.w, this.decoration.shopSprites.var1.h);
        image(this.decoration.shopSprites.var2.img, this.decoration.shopSprites.var2.x, this.decoration.shopSprites.var2.y, this.decoration.shopSprites.var2.w, this.decoration.shopSprites.var2.h);
        image(this.decoration.shopSprites.var3.img, this.decoration.shopSprites.var3.x, this.decoration.shopSprites.var3.y, this.decoration.shopSprites.var3.w, this.decoration.shopSprites.var3.h);

        //Main sprite and fly
        image(this.decoration.shopSprites.mainSprite.img, this.decoration.shopSprites.mainSprite.x, this.decoration.shopSprites.mainSprite.y, this.decoration.shopSprites.mainSprite.w, this.decoration.shopSprites.mainSprite.h);
        // console.log(this.sprites.mainSprite.x);
        image(this.block.price.flyImg.img, this.block.price.flyImg.x, this.block.price.flyImg.y, this.block.price.flyImg.w, this.block.price.flyImg.h);
        pop();

    }

    updatePos(mainY, var1Y, var2Y, var3Y) {
        this.decoration.shopSprites.var1.y = var1Y;
        this.decoration.shopSprites.var2.y = var2Y;
        this.decoration.shopSprites.var3.y = var3Y;
        this.decoration.shopSprites.mainSprite.y = mainY;
    }

    isMouseOverButton(varButton) {
        let minX = varButton.button.x - varButton.button.w / 2;
        let maxX = varButton.button.x + varButton.button.w / 2;
        let minY = varButton.button.y - varButton.button.h / 2;
        let maxY = varButton.button.y + varButton.button.h / 2;
        return mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY;
    }

    /**
     * Checks which variation the mouse is clicking
     * Checks whether the player has enough flies
     * If both true, spawns in that variation of the Decoration object
     */
    spawnDecoration() {
        if (this.isMouseOverButton(this.block.subBlock.var1) && this.checkPrice(this.block.subBlock)) {
            createNewDecoration(this.decoration, this.decoration.colorVariations, 0);
            this.subtractCost();
        } else if (this.isMouseOverButton(this.block.subBlock.var2) && this.checkPrice(this.block.subBlock)) {
            createNewDecoration(this.decoration, this.decoration.colorVariations, 1);
            this.subtractCost();
        } else if (this.isMouseOverButton(this.block.subBlock.var3) && this.checkPrice(this.block.subBlock)) {
            createNewDecoration(this.decoration, this.decoration.colorVariations, 2);
            this.subtractCost();
        }
        console.log(decoObjects);
    }

    /**
     * Checks if the player has enough flies to buy the decoration
     * @returns {boolean} Whether the user has enough flies caught
     * @param subBlock The sub block of the shop item holding all the buttons
     */
    checkPrice(subBlock) {
        if (totalFlies >= this.decoration.price) {
            subBlock.var1.button.fill = "#587dca";
            subBlock.var2.button.fill = "#587dca";
            subBlock.var3.button.fill = "#587dca";
            return true;
        } else {
            subBlock.var1.button.fill = "#18284a";
            subBlock.var2.button.fill = "#18284a";
            subBlock.var3.button.fill = "#18284a";
            return false;
        }
    }

    /**
     * Subtracts the cost of the Decoration from the total flies and updates the UI
     */
    subtractCost() {
        //Deduct cost
        totalFlies -= this.decoration.price;
        //Update UI
        UI.decoUI.leftBar.panel.txt.txt = " =   " + totalFlies;
        //Reset button colors if not enough flies
        this.checkPrice(this.block.subBlock);
    }
}

function drawShop(block, decoProps) {
    //Sub block
    push();
    drawPanel(block.subBlock);
    //Buy buttons
    drawBuyButton(block.subBlock.var1.button);
    drawBuyButton(block.subBlock.var2.button);
    drawBuyButton(block.subBlock.var3.button);
    pop();

    //Block
    push();
    drawPanel(block);
    pop();

    //text
    push();
    fill(block.price.txt.fill);
    stroke("black");
    textAlign(CENTER, CENTER);
    textSize(block.price.txt.size);
    strokeWeight(block.price.txt.weight);
    text(block.price.txt.txt + decoProps.price, block.price.txt.x, block.price.txt.y);
    pop();
}


/**
 * Makes a copy of the block property and pushes it to the blocks array
 */
function createBlock() {

    let newBlock = {
        x: 1315,
        y: 250,
        w: 160,
        h: 100,
        fill: "#96beb1",
        totalHeight: 0,
        price: {
            txt: {
                x: 1323,
                y: 250,
                txt: "=> ",
                fill: "black",
                size: 22,
                weight: 1,
            },
            flyImg: {
                img: "",
                x: 1370,
                y: 250,
                w: 140,
                h: 140
            }
        },
        subBlock: {
            x: 1315,
            y: 375,
            w: 160,
            h: 300,
            fill: "#5a7e6f",
            var1: {
                button: {
                    x: 1345,
                    y: 335,
                    w: 60,
                    h: 30,
                    fill: "#18284a",
                    canClick: false,
                    isAvailable: false
                }
            },
            var2: {
                button: {
                    x: 1345,
                    y: 410,
                    w: 60,
                    h: 30,
                    fill: "#18284a",
                    canClick: false,
                    isAvailable: false
                }
            },
            var3: {
                button: {
                    x: 1345,
                    y: 485,
                    w: 60,
                    h: 30,
                    fill: "#18284a",
                    canClick: false,
                    isAvailable: false
                }
            }
        }
    }

    newBlock.price.flyImg.img = UI.decoUI.leftBar.panel.fly.img;

    return newBlock;
}
