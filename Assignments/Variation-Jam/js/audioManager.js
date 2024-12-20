"use strict";

let audio = {
    tutorials: {
        pong: undefined,
        cow: undefined,
        mathing: undefined,
        pattern: undefined,
    },
    gameSounds: {
        paddle: undefined,
        moos: [],
        moo_1: undefined,
        moo_2: undefined,
        tickingClock: undefined,
        enterWoosh: undefined,
        exitWoosh: undefined,
    },
    comments: {
        goingGreat: {
            hasPlayed: false,
            audio: undefined,
        },
        music: undefined,
    }

}

function preloadAudio() {

    audio.tutorials.pong = loadSound('assets/sounds/tutorial/pong.wav');
    audio.tutorials.cow = loadSound('assets/sounds/tutorial/cow.wav');
    audio.tutorials.mathing = loadSound('assets/sounds/tutorial/math.wav');
    audio.tutorials.pattern = loadSound('assets/sounds/tutorial/pattern.wav');

    audio.gameSounds.paddle = loadSound('assets/sounds/gameSounds/paddle.wav')
    audio.gameSounds.moo_1 = loadSound('assets/sounds/gameSounds/moo_1.wav')
    audio.gameSounds.moo_2 = loadSound('assets/sounds/gameSounds/moo_2.wav')
    audio.gameSounds.tickingClock = loadSound('assets/sounds/gameSounds/ticking_clock.wav')
    audio.gameSounds.enterWoosh = loadSound('assets/sounds/gameSounds/enter_woosh.wav')
    audio.gameSounds.exitWoosh = loadSound('assets/sounds/gameSounds/exit_woosh.wav')

    audio.comments.goingGreat.audio = loadSound('assets/sounds/comments/going_great.wav')
    audio.comments.music = loadSound('assets/sounds/comments/music.wav')

}

function playSound(sound) {
    if (!sound.isPlaying()) {
        sound.play();
    }
}