'use strict';

import GameLoop from './gameloop';
import Data from './data';
import Init from './init';

let context = document.getElementById('canvas').getContext('2d'),
    data = new Data();

data.load([
    'img/enemies.png',
    'img/towers.png',
    'img/bglevel-1.png'
]);

data.onReady(Init.startInit);

exports.context = context;
exports.data = data;
exports.gameLoop = GameLoop;






