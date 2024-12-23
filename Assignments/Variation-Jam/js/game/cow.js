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
    // if (!activeTasks.randomCow) {
    if (!tasks.cow.isActive) {
        // activeTasks.task = "cow";
        tasks.currentTask = tasks.cow.name;
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
    // if (hasClicked && !successes.cowSuccess && mouseX >= cow.x - cow.w / 2 && mouseX <= cow.x + cow.x / 2 && mouseY >= cow.y - cow.w / 2 && mouseY <= cow.y + cow.w / 2) {
    if (hasClicked && !tasks.cow.isSuccessful && mouseX >= cow.x - cow.w / 2 && mouseX <= cow.x + cow.x / 2 && mouseY >= cow.y - cow.w / 2 && mouseY <= cow.y + cow.w / 2) {
        // Play the interrupt line
        if (audio.tutorials.cow.isPlaying()) {
            audio.tutorials.cow.stop();
            playSound(audio.comments.howRude.audio);
        } else {
            playMooSound();
        }
        cow.f.fill = cow.f.selected;
        // successes.cowSuccess = true;
        tasks.cow.isSuccessful = true;
        // updateHealth(successes.cowSuccess);
        updateHealth(tasks.cow.isSuccessful);
        //Increment counter
        // counters.cow++
        tasks.cow.counter++
    }

    // Check if the cow goes off-screen
    if (cow.x + cow.w / 2 < 0 || cow.y - cow.w / 2 > height) {
        // if (!successes.cowSuccess) {
        if (!tasks.cow.isSuccessful) {
            updateHealth(false);
        }
        renewCow(cow);
    }
}

/**
 * Resets the cow properties
 * @param cow The cow properties
 */
function renewCow(cow) {
    // Reset cow position to start again from the right
    cow.x = width + cow.w / 2; // Start on the right edge
    cow.y = random(100, height - 100); // Random vertical position
    cow.f.fill = cow.f.neutral;
    // successes.cowSuccess = false;
    tasks.cow.isSuccessful = false;
}

/**
 * Randomly picks a moo sound to play
 */
function playMooSound() {
    // One in three chance for the moo to be the funny one
    let r = floor(random(3));

    if (r === 1) {
        playSound(audio.gameSounds.moo_2);
    } else {
        playSound(audio.gameSounds.moo_1);
    }

}

function resetCow() {
    cow.x = 640;
    cow.y = 100;
    cow.f.fill = cow.f.neutral;
}