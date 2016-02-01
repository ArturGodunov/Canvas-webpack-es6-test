'use strict';

export default class Tower {

    constructor(x, y, radius, cost) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.cost = cost;

        this._draw();
    }

    _draw() {
        app.context.drawImage(app.data.get('img/towers.png'), this.x, this.y);
    }

};