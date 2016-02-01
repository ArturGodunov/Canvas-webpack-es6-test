'use strict';

import GameLoop from './gameloop';
import Data from './data';
import Init from './init';
import Tower from './tower';
import Enemy from './enemy';
import Shell from './shell';

let context = document.getElementById('canvas').getContext('2d'),
    data = new Data();

data.load([
    'img/enemies.png',
    'img/towers.png',
    'img/shells.png',
    'img/bglevel-1.png'
]);

data.onReady(Init.startInit);

exports.context = context;
exports.data = data;
exports.gameLoop = GameLoop;
exports.tower = Tower;
exports.enemy = Enemy;
exports.shell = Shell;






