'use strict';

/** Class representing enemy.*/
export default class Enemy {

    /**
     * Create enemy.
     * @param {number} x - In pixels.
     * @param {number} y - In pixels.
     * @param {number} speed - In pixels per second.
     * @param {number} health.
     * */
    constructor(x, y, speed, health) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = 40;
        this.health = health;

        this._centerCoord();
    }

    _centerCoord() {
        this.centerX = this.x + this.size / 2;
        this.centerY = this.y + this.size / 2;
    }

    /**
     * Move enemy.
     * @param {number} date - Increment date from method _frame.
     * */
    move(date) {
        this._centerCoord();

        /**
         * For now enemies move in a straight line.
         *
         * @todo After creation map of level, Change method 'move'.
         * */
        this.x -= this.speed * date;
    }

    draw() {
        app.context.drawImage(app.data.get('img/enemies.png'), this.x, this.y);
    }

};