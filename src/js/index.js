'use strict';

let context = document.getElementById('canvas').getContext('2d');

import Loop from './loop';
import Data from './data';
import Init from './init';

let data = new Data();

data.load([
    'img/enemies.png',
    'img/towers.png',
    'img/bglevel-1.png'
]);

data.onReady(init);






