"use strict";


let cow = {
    x: 640,
    y: 100,
    w: 50,
    f: {
        fill: undefined,
        neutral: "#000000",
        selected: "#eaa2d3"
    }
}

/**
 * Makes a random cow fly across the screen. The user must tap it before it moves off-screen
 * @param cow
 */
function randomCow(cow) {
    if (!activeTasks.randomCow) {
        activeTasks.task = "cow";
    }
    //Draw cow
    push();
    fill(cow.f.fill);
    ellipse(cow.x, cow.y, cow.w);
    pop();

    //Move cow
    cow.x -= 1;
    cow.y += 0.25;

    //Check if mouse clicked cow
    if (hasClicked && !successes.cowSuccess && mouseX >= cow.x - cow.w / 2 && mouseX <= cow.x + cow.x / 2 && mouseY >= cow.y - cow.w / 2 && mouseY <= cow.y + cow.w / 2) {
        console.log("moo sound");
        cow.f.fill = cow.f.selected;
        successes.cowSuccess = true;
        handleHealth(successes.cowSuccess);
        //Increment counter
        counters.cow++
    }

    // Check if the cow goes off-screen
    if (cow.x + cow.w / 2 < 0 || cow.y - cow.w / 2 > height) {
        if (!successes.cowSuccess) {
            handleHealth(false);
        }
        resetCow(cow);
    }
}

/**
 * Resets the cow properties
 * @param cow The cow properties
 */
function resetCow(cow) {
    // Reset cow position to start again from the right
    cow.x = width + cow.w / 2; // Start on the right edge
    cow.y = random(100, height - 100); // Random vertical position
    cow.f.fill = cow.f.neutral;
    successes.cowSuccess = false;
}
