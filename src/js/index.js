'use strict';

import Scene from './scene';

let scene = new Scene();
let gameLoop = new GameLoop();

scene.onload(1);

let tower = new Tower(50, 400, 200, 100);

