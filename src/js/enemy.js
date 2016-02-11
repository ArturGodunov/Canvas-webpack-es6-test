'use strict';

/** Class representing enemy.*/
export default class Enemy {

    /**
     * Create enemy.
     * @param {number} centerX - In pixels.
     * @param {number} centerY - In pixels.
     * @param {number} speed - In pixels per second.
     * @param {number} health.
     * @param {Array} steps.
     * */
    constructor(centerX, centerY, speed, health, steps) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.speed = speed;
        this.size = 20;
        this.health = health;
        this.passedPoints = 0;
        this.steps = steps;

        this._centerCoord();
    }

    _centerCoord() {
        this.x = this.centerX - this.size / 2;
        this.y = this.centerY - this.size / 2;
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
                this.centerX -= this.speed * date;
                break;
            case 'right':
                this.centerX += this.speed * date;
                break;
            case 'up':
                this.centerY -= this.speed * date;
                break;
            case 'down':
                this.centerY += this.speed * date;
                break;
        }

        this.steps[this.passedPoints] -= this.speed * date;
    }

    draw() {
        app.context.drawImage(app.data.get('img/enemies.png'), this.x, this.y);
    }

};