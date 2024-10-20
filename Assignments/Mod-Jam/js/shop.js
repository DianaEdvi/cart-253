"use strict";

class ShopItem {
    constructor(block, sprites) {
        this.block = block;
        this.sprites = sprites;
    }

    draw() {
        drawShop(this.block, this.sprites);
        this.displayShopSprites();
    }

    displayShopSprites() {
        push();
        imageMode(CENTER);
        //Variation sprites
        image(this.sprites.var1.img, this.sprites.var1.x, this.sprites.var1.y, this.sprites.var1.w, this.sprites.var1.h);
        image(this.sprites.var2.img, this.sprites.var2.x, this.sprites.var2.y, this.sprites.var2.w, this.sprites.var2.h);
        image(this.sprites.var3.img, this.sprites.var3.x, this.sprites.var3.y, this.sprites.var3.w, this.sprites.var3.h);

        //Main sprite and fly
        image(this.sprites.mainSprite.img, this.sprites.mainSprite.x, this.sprites.mainSprite.y, this.sprites.mainSprite.w, this.sprites.mainSprite.h);
        // console.log(this.sprites.mainSprite.x);
        image(this.block.price.flyImg.img, this.block.price.flyImg.x, this.block.price.flyImg.y, this.block.price.flyImg.w, this.block.price.flyImg.h);
        pop();

    }

    updatePos(mainY, var1Y, var2Y, var3Y) {
        this.sprites.var1.y = var1Y;
        this.sprites.var2.y = var2Y;
        this.sprites.var3.y = var3Y;
        this.sprites.mainSprite.y = mainY;
    }
}

function drawShop(block) {
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
    text(block.price.txt.txt, block.price.txt.x, block.price.txt.y);
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
                txt: "=> 3",
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
                    fill: "#18284a"
                }
            },
            var2: {
                button: {
                    x: 1345,
                    y: 410,
                    w: 60,
                    h: 30,
                    fill: "#18284a"
                }
            },
            var3: {
                button: {
                    x: 1345,
                    y: 485,
                    w: 60,
                    h: 30,
                    fill: "#18284a"
                }
            }
        }
    }

    newBlock.price.flyImg.img = UI.decoUI.leftBar.panel.fly.img;

    return newBlock;
}
