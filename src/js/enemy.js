'use strict';

export default class Enemy {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this._appear();
    }

    _appear() {
        app.context.drawImage(app.data.get('img/enemies.png'), this.x, this.y);
    }

    die() {

    }
};