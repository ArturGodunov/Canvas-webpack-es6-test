'use strict';

export default class Enemy {

    constructor(x, y, speed, size) {
        this.x = x;
        this.y = y;
        this.speed = speed; // Speed in pixels per second
        this.size = size;
    }

    draw() {
        app.context.drawImage(app.data.get('img/enemies.png'), this.x, this.y);
    }

};