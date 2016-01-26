'use strict';

export default class GameLoop {

    constructor() {
        this.startEnemies(10);
    }

    startEnemies(time) {
        setTimeout(start, time);
    }

    frame() {
        this.now = Date.now();
        this.date = (this.now - this.lastTime) / 1000;

        this.update();
        this.render();

        this.lastTime = this.now;
        requestAnimationFrame(this.frame());
    }

    update() {

    }

    render() {

    }

};