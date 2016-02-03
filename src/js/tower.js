'use strict';

export default class Tower {

    constructor(x, y, radius, rate) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.size = 40;
        this.centerX = this.x + this.size / 2;
        this.centerY = this.y + this.size / 2;
        this.rate = rate;
        this.framesBeforeShoot = this.rate;
    }

    draw() {
        app.context.drawImage(app.data.get('img/towers.png'), this.x, this.y);

        app.context.beginPath();
        app.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        app.context.strokeStyle = 'red';
        app.context.stroke();
    }

};