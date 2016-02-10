'use strict';

/** Class representing enemy.*/
export default class Enemy {

    /**
     * Create enemy.
     * @param {number} x - In pixels.
     * @param {number} y - In pixels.
     * @param {number} speed - In pixels per second.
     * @param {number} health.
     * @param {Array} steps.
     * */
    constructor(x, y, speed, health, steps) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = 40;
        this.health = health;
        this.passedPoints = 0;
        this.steps = steps;

        this._centerCoord();
    }

    _centerCoord() {
        this.centerX = this.x + this.size / 2;
        this.centerY = this.y + this.size / 2;
    }

    /**
     * Move enemy.
     * @param {number} date - Increment date from method _frame.
     * @param {string} direction.
     * */
    move(date, direction) {
        this._centerCoord();

        switch (direction) {
            case 'left':
                this.x -= this.speed * date;
                break;
            case 'right':
                this.x += this.speed * date;
                break;
            case 'up':
                this.y -= this.speed * date;
                break;
            case 'down':
                this.y += this.speed * date;
                break;
        }
/*не работает*/
        this.steps[this.passedPoints * 2 + 1] -= this.speed * date;
    }

    draw() {
        app.context.drawImage(app.data.get('img/enemies.png'), this.x, this.y);
    }

};