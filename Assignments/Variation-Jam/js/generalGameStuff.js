"use strict";

let banners = {
    red: {
        x1: 690,
        y1: 540,
        x2: 740,
        y2: 340,
        x3: 1180,
        y3: 340,
        x4: 1130,
        y4: 540
    },
    white: {
        x1: undefined,
        y1: undefined,
        x2: undefined,
        y2: undefined,
        x3: undefined,
        y3: undefined,
        x4: undefined,
        y4: undefined
    },
    text: {
        x: undefined,
        y: undefined,
        w: 390,
        h: 100,
        size: 30,
        f: "black",
        text: undefined
    }
}

let bannerState = "forwards"

/**
 * Pushes a banner onto the screen and keeps it there for a few seconds. Then it gets pulled off the screen
 * @param displayStr
 */
function bannerAnimation(displayStr) {
    setBannerText();
    //Make banner contents depend on red banner
    banners.white.x1 = banners.red.x1 - 30
    banners.white.y1 = banners.red.y1 + 30
    banners.white.x2 = banners.red.x2 - 30
    banners.white.y2 = banners.red.y2 + 30
    banners.white.x3 = banners.red.x3 - 30
    banners.white.y3 = banners.red.y3 + 30
    banners.white.x4 = banners.red.x4 - 30
    banners.white.y4 = banners.red.y4 + 30

    banners.text.x = banners.red.x2 + (banners.red.x4 - banners.red.x2) / 2
    banners.text.y = banners.red.y2 + (banners.red.y1 - banners.red.y2) / 2


    // Handle banner movement based on state
    if (bannerState === "forwards") {
        if (banners.red.x1 > 100) {
            // Move banners
            banners.red.x1 -= 20;
            banners.red.x2 -= 20;
            banners.red.x3 -= 20;
            banners.red.x4 -= 20;
        } else if (!timers.bannerTimerStarted) {
            // Keep the banner there for 3 seconds
            timers.bannerTimerStarted = true;
            setTimeout(() => {
                bannerState = "backwards";
                timers.bannerTimerStarted = false;
            }, 3000);
        }
    } else if (bannerState === "backwards") {
        if (banners.red.x1 < 690) {
            // Move banners back
            banners.red.x1 += 20;
            banners.red.x2 += 20;
            banners.red.x3 += 20;
            banners.red.x4 += 20;
        } else {
            // Reset variables
            bannerState = "forwards";
            playingBanner = false;
            activeTasks.task = undefined;
        }
    }

    //Draw white banner under red banner
    push();
    fill("#faf8d6");
    quad(banners.white.x1, banners.white.y1, banners.white.x2, banners.white.y2, banners.white.x3, banners.white.y3, banners.white.x4, banners.white.y4);
    pop();
    // console.log(banners.text.x, banners.text.y, banners.text.w, banners.text.h)

    //Draw red banner
    push();
    fill("#ff6a6a");
    quad(banners.red.x1, banners.red.y1, banners.red.x2, banners.red.y2, banners.red.x3, banners.red.y3, banners.red.x4, banners.red.y4);
    pop();
    //Rect
    push();
    fill("red")
    rectMode(CENTER)
    rect(banners.text.x, banners.text.y, banners.text.w, banners.text.h)
    // console.log(banners.text.x, banners.text.y, banners.text.w, banners.text.h)
    pop();

    //Draw the text on top
    push();
    fill(banners.text.f);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textWrap(WORD);
    textSize(banners.text.size);
    noStroke();
    text(displayStr, banners.text.x, banners.text.y, banners.text.w);
    pop();
}

function setBannerText() {
    if (activeTasks.task === "solo") {
        banners.text.text = "Don't drop the ball"
        activeTasks.soloPong = true;
    } else if (activeTasks.task === "cow") {
        banners.text.text = "You should pet the cows methinks"
        activeTasks.randomCow = true;
    } else if (activeTasks.task === "math") {
        banners.text.text = "If I had to do math for this, so do you :)"
        activeTasks.mathing = true;
    } else if (activeTasks.task === "pattern") {
        banners.text.text = "Patterns"
        activeTasks.patterns = true;
    } else {
        banners.text.text = undefined;
    }
}

function activateBannerOnce(counter, newTask, countThreshold, audio) {
    //Play the banner only once
    if (counter === countThreshold && !newTask) {
        playSound(audio);
        playingBanner = true;
    }
}

let healthBar = {
    x: 50,
    y: 50,
    size: 100,
    container: {
        f: "#cacaca"
    },
    healthPoints: {
        f: "#9066b2",
        currentValue: 100,
        minValue: 0,
        maxValue: 100,
        decayRate: -0.01,
        animation: {
            gainingHealth: {
                isActive: false,
                counter: 0,
                amount: 15,
                rateOfChange: 1
            },
            losingHealth: {
                isActive: false,
                counter: 0,
                amount: 15,
                rateOfChange: -1
            }
        }
    }
}

/**
 * Handles the health meter. Increases the health if a task was completed successfully and decreases if it fails
 * Animates the increase so as not to be janky
 * @param succeeded Bool for whether the task was successful or not
 */
function handleHealth(succeeded) {
    // Decay or animate health changes
    if (succeeded === undefined) {
        healthBar.healthPoints.currentValue += healthBar.healthPoints.decayRate;
    } else if (!succeeded) {
        healthBar.healthPoints.animation.losingHealth.isActive = true;
    } else {
        healthBar.healthPoints.animation.gainingHealth.isActive = true;
    }

    // Apply animations
    animateHealth(healthBar.healthPoints.animation.gainingHealth);
    animateHealth(healthBar.healthPoints.animation.losingHealth);

    // Constrain value after any modification
    healthBar.healthPoints.currentValue = constrain(
        healthBar.healthPoints.currentValue,
        healthBar.healthPoints.minValue,
        healthBar.healthPoints.maxValue
    );

    // Draw the health bar
    drawHealth();
}

/**
 * Display the health as a circle that is being filled clockwise
 */
function drawHealth() {
    // Calculate the fill level (proportion of the circle filled)
    let fillLevel = map(healthBar.healthPoints.currentValue, 0, healthBar.healthPoints.maxValue, 0, TWO_PI); // Map value to an angle (0 to 2π)

    // Draw the background circle
    push();
    fill(healthBar.container.f);
    ellipse(healthBar.x, healthBar.y, healthBar.size);
    pop();

    // Draw the filled portion
    push();
    noStroke()
    fill(healthBar.healthPoints.f);
    angleMode(RADIANS);
    arc(healthBar.x, healthBar.y, healthBar.size, healthBar.size, -HALF_PI, -HALF_PI + fillLevel, PIE);
    pop();
}

/**
 * Handles the animation of the health bar in response to a task's completion
 * @param animation
 */
function animateHealth(animation) {
    // Handle change in health animation
    if (animation.isActive && animation.counter < animation.amount) {
        animation.counter += abs(animation.rateOfChange);
        healthBar.healthPoints.currentValue += animation.rateOfChange;
    }

    // Reset values if animation is complete
    if (animation.counter === animation.amount) {
        animation.counter = 0;
        animation.isActive = false;
    }
}


function manageFailState() {
    if (healthBar.healthPoints.currentValue === 0) {
        console.log("its still 0")
        gameState = 'end';
    }
}