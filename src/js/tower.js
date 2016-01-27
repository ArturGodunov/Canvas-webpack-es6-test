'use strict';

export default class Tower {

    constructor(x, y, radius, cost) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.cost = cost;

        this._appear();
    }

    _appear() {

    }

    fire(x, y) {
        let shell = new Shell(x, y);
    }
};