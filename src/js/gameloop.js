'use strict';

export default class GameLoop {

    constructor(lastTime) {
        this.lastTime = lastTime;

        this._frame();
    }

    _frame() {
        //this.now = Date.now();
        //this.date = (this.now - this.lastTime) / 1000;

        //this._update();
        this._render();

        //this.lastTime = this.now;
        //requestAnimationFrame(this._frame());
    }

    _update() {

    }

    _render() {
        app.context.drawImage(app.data.get('img/bglevel-1.png'), 0, 0);
    }

};