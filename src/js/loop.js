'use strict';

export default class GameLoop {

    constructor() {
        this._frame();
    }

    _frame() {
        this.now = Date.now();
        this.date = (this.now - this.lastTime) / 1000;

        this._update();
        this._render();

        this.lastTime = this.now;
        requestAnimationFrame(this._frame());
    }

    _update() {

    }

    _render() {

    }

};