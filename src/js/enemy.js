'use strict';

export default class Enemy {

    constructor(x, y, speed, health) {
        this.x = x;
        this.y = y;
        this.speed = speed; // Speed in pixels per second
        this.size = 40;
        this.health = health;

        this._centerCoord();
    }

    _centerCoord() {
        this.centerX = this.x + this.size / 2;
        this.centerY = this.y + this.size / 2;
    }

    move(date) {
        this._centerCoord();

        this.x -= this.speed * date; // пока движется только по прямой
    }

    draw() {
        app.context.drawImage(app.data.get('img/enemies.png'), this.x, this.y);
    }

    die() {
        new app.explosion(this.centerX, this.centerY)
    }

};