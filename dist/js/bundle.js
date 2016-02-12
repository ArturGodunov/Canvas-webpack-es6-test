var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _gameloop = __webpack_require__(1);

	var _gameloop2 = _interopRequireDefault(_gameloop);

	var _data = __webpack_require__(2);

	var _data2 = _interopRequireDefault(_data);

	var _init = __webpack_require__(3);

	var _init2 = _interopRequireDefault(_init);

	var _tower = __webpack_require__(4);

	var _tower2 = _interopRequireDefault(_tower);

	var _enemy = __webpack_require__(5);

	var _enemy2 = _interopRequireDefault(_enemy);

	var _shell = __webpack_require__(6);

	var _shell2 = _interopRequireDefault(_shell);

	var _explosion = __webpack_require__(7);

	var _explosion2 = _interopRequireDefault(_explosion);

	var _map = __webpack_require__(8);

	var _map2 = _interopRequireDefault(_map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var context = document.getElementById('canvas').getContext('2d'),
	    data = new _data2.default();

	data.load(['img/enemies.png', 'img/towers.png', 'img/shells.png', 'img/explosions.png', 'img/bglevel-1.png']);

	data.onReady(_init2.default.startInit);

	exports.context = context;
	exports.data = data;
	exports.gameLoop = _gameloop2.default;
	exports.tower = _tower2.default;
	exports.enemy = _enemy2.default;
	exports.shell = _shell2.default;
	exports.explosion = _explosion2.default;
	exports.map = _map2.default;

	/**
	 * @todo Level map!!! Create start point.
	 * @todo Create adding towers.
	 * */

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/** Class representing game loop.*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameLoop = function () {

	    /**
	     * Create game loop.
	     * @param {number} lastTime - Timestamp of starting game loop.
	     * @param {number} levelNumber.
	     * */

	    function GameLoop(lastTime, levelNumber) {
	        _classCallCheck(this, GameLoop);

	        this.canvasWidth = document.getElementById('canvas').offsetWidth;
	        this.canvasHeight = document.getElementById('canvas').offsetHeight;
	        this.levelNumber = levelNumber;
	        this.gameTime = 0;
	        this.lastTime = lastTime;
	        this.enemyDirecrions = [];
	        this.enemySteps = [];
	        this.towers = [];
	        this.shells = [];
	        this.enemies = [];
	        this.explosions = [];
	        this.amountEnemies = 0; /** Amount enemies on map.*/
	        this.maxAmountEnemies = 10; /** Max amount enemies on map.*/
	        this.maxAmountEnemiesPass = 2; /** Max amount enemies passing map.*/
	        this.amountEnemiesPass = 0; /** Amount enemies passing map.*/
	        this.timeAddEnemy = 1; /** Time to adding first enemy.*/
	        this.isGameOver = false;

	        this.startLevel();
	    }

	    _createClass(GameLoop, [{
	        key: 'startLevel',
	        value: function startLevel() {
	            this.map = new app.map(this.levelNumber);

	            for (var i = 0; i < this.map.level.length; i++) {
	                if (i % 2 === 0) {
	                    this.enemyDirecrions.push(this.map.level[i]);
	                } else {
	                    this.enemySteps.push(this.map.level[i]);
	                }
	            }

	            this._frame();
	        }
	    }, {
	        key: '_frame',
	        value: function _frame() {
	            var now = Date.now();
	            this.incrementDate = (now - this.lastTime) / 1000;

	            this._update();
	            this._render();

	            if (this.isGameOver) {
	                return;
	            }

	            this.lastTime = now;
	            requestAnimationFrame(this._frame.bind(this)); /** Bind the context of this class, else the context will be 'window'.*/
	        }
	    }, {
	        key: '_update',
	        value: function _update() {
	            this.gameTime += this.incrementDate;

	            this._updateEnemies();
	            this._updateShells();
	            this._updateExplosions();

	            /**
	             * Create new towers.
	             *
	             * @todo Create method of adding towers.
	             * */
	            if (this.towers < 2) {
	                /**
	                 * @param {number} x - In pixels.
	                 * @param {number} y - In pixels.
	                 * @param {number} radius - In pixels.
	                 * @param {number} rate - Time to next shoot.
	                 * */
	                this.towers.push(new app.tower(340, 160, 100, 1));
	                this.towers.push(new app.tower(100, 100, 100, 1));
	            }

	            /**
	             * Add new enemies.
	             * */
	            if (this.amountEnemies < this.maxAmountEnemies) {
	                if (this.gameTime > this.timeAddEnemy) {
	                    /**
	                     * @param {number} centerX - In pixels.
	                     * @param {number} centerY - In pixels.
	                     * @param {number} speed - In pixels per second.
	                     * @param {number} health.
	                     * @param {Array} steps - Transfer the array by value.
	                     *
	                     * @todo Create universal start point.
	                     * */
	                    //this.enemies.push(new app.enemy(this.canvasWidth, 100, 50, 100, [].concat(this.enemySteps)));
	                    this.amountEnemies++;
	                    this.timeAddEnemy += 1; /** Time to adding next enemy.*/
	                }
	            }

	            this._checkCollisions();
	        }
	    }, {
	        key: '_updateEnemies',
	        value: function _updateEnemies() {
	            for (var i = 0; i < this.enemies.length; i++) {
	                this.enemies[i].move(this.incrementDate, this.enemyDirecrions[this.enemies[i].passedPoints]);
	                /**
	                 * Passing points.
	                 * */
	                if (this.enemies[i].steps[this.enemies[i].passedPoints] <= 0) {
	                    this.enemies[i].passedPoints++;
	                }

	                /**
	                 * @todo Create delete enemy when he pass the map.
	                 * */
	                if (this.enemyDirecrions[this.enemyDirecrions.length - 1] === 'left' && this.enemies[i].x + this.enemies[i].size < 0) {
	                    this.enemies.splice(i, 1);
	                    i--;
	                    this.amountEnemiesPass++;
	                }
	            }
	        }
	    }, {
	        key: '_updateShells',
	        value: function _updateShells() {
	            for (var i = 0; i < this.shells.length; i++) {
	                this.shells[i].move(this.incrementDate);

	                if (this.shells[i].centerX < 0 || this.shells[i].centerX > this.canvasWidth || this.shells[i].centerY < 0 || this.shells[i].centerY > this.canvasHeight) {
	                    this.shells.splice(i, 1);
	                    i--;
	                }
	            }
	        }
	    }, {
	        key: '_updateExplosions',
	        value: function _updateExplosions() {
	            for (var i = 0; i < this.explosions.length; i++) {
	                this.explosions[i].amountFramesDrawing++;
	                if (this.explosions[i].amountFramesDrawing === this.explosions[i].maxAmountFramesDrawing) {
	                    this.explosions.splice(i, 1);
	                    i--;
	                }
	            }
	        }
	    }, {
	        key: '_checkCollisions',
	        value: function _checkCollisions() {
	            this._checkEnemiesMaxPass();
	            this._checkCrossingCircles();
	            this._checkCollisionsEnemiesShells();
	        }
	    }, {
	        key: '_checkEnemiesMaxPass',
	        value: function _checkEnemiesMaxPass() {
	            if (this.amountEnemiesPass >= this.maxAmountEnemiesPass) {
	                this._gameOver();
	            }
	        }
	    }, {
	        key: '_checkCrossingCircles',
	        value: function _checkCrossingCircles() {
	            for (var i = 0; i < this.towers.length; i++) {
	                for (var j = 0; j < this.enemies.length; j++) {
	                    var enemyCenterX = this.enemies[j].centerX,
	                        enemyCenterY = this.enemies[j].centerY,
	                        towerCenterX = this.towers[i].centerX,
	                        towerCenterY = this.towers[i].centerY,
	                        a = Math.pow(enemyCenterX - towerCenterX, 2) + Math.pow(enemyCenterY - towerCenterY, 2),
	                        b = Math.pow(this.towers[i].radius, 2);
	                    if (a <= b) {
	                        if (this.towers[i].timeDetectionFirstEnemy === 0) {
	                            this.towers[i].timeDetectionFirstEnemy = this.gameTime;
	                        }
	                        if (this.gameTime > this.towers[i].timeDetectionFirstEnemy + this.towers[i].timeNextShoot) {
	                            /**
	                             * @param {number} towerCenterX - In pixels.
	                             * @param {number} towerCenterY - In pixels.
	                             * @param {number} enemyCenterX - In pixels.
	                             * @param {number} enemyCenterY - In pixels.
	                             * @param {number} speed - In pixels per second.
	                             * @param {number} size - In pixels.
	                             * @param {number} damage.
	                             * */
	                            this.shells.push(new app.shell(towerCenterX, towerCenterY, enemyCenterX, enemyCenterY, 200, 10, 50));
	                            this.towers[i].timeNextShoot += this.towers[i].rate;
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_checkCollisionsEnemiesShells',
	        value: function _checkCollisionsEnemiesShells() {
	            for (var i = 0; i < this.enemies.length; i++) {
	                for (var j = 0; j < this.shells.length; j++) {
	                    var shellCenterX = this.shells[j].centerX,
	                        shellCenterY = this.shells[j].centerY,
	                        enemyCenterX = this.enemies[i].centerX,
	                        enemyCenterY = this.enemies[i].centerY,
	                        a = Math.pow(enemyCenterX - shellCenterX, 2) + Math.pow(enemyCenterY - shellCenterY, 2),
	                        b = Math.pow(this.enemies[i].size + this.shells[j].size, 2) / 4;
	                    if (a <= b) {
	                        this.enemies[i].health -= this.shells[j].damage;
	                        if (this.enemies[i].health <= 0) {
	                            /**
	                             * @param {number} enemyCenterX.
	                             * @param {number} enemyCenterY.
	                             * */
	                            this.explosions.push(new app.explosion(enemyCenterX, enemyCenterY));
	                            this.enemies.splice(i, 1);
	                            i--;
	                        }
	                        this.shells.splice(j, 1);
	                        j--;
	                        break;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_render',
	        value: function _render() {
	            /**
	             * Clear canvas before all rendering.
	             * */
	            app.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

	            this.map.draw();

	            for (var i = 0; i < this.towers.length; i++) {
	                this.towers[i].draw();
	            }

	            for (var i = 0; i < this.enemies.length; i++) {
	                this.enemies[i].draw();
	            }

	            for (var i = 0; i < this.shells.length; i++) {
	                this.shells[i].draw();
	            }

	            for (var i = 0; i < this.explosions.length; i++) {
	                this.explosions[i].draw();
	            }
	        }
	    }, {
	        key: '_gameOver',
	        value: function _gameOver() {
	            document.getElementById('game-over_mask').classList.add('show');
	            this.isGameOver = true;
	        }
	    }]);

	    return GameLoop;
	}();

	exports.default = GameLoop;
	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/** Class representing resources.*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Data = function () {

	    /**
	     * Create data.
	     * */

	    function Data() {
	        _classCallCheck(this, Data);

	        this.cache = {};
	        this.readyCallBacks = [];

	        /**
	         * @todo When create start point, think about first/last step.
	         * */
	        this._loadLevels();
	    }

	    _createClass(Data, [{
	        key: '_loadLevels',
	        value: function _loadLevels() {
	            var _this = this;

	            var xhr = new XMLHttpRequest();

	            xhr.open('GET', 'levels.json', true);
	            xhr.send();

	            xhr.onreadystatechange = function () {
	                if (xhr.readyState != 4) return;

	                if (xhr.status != 200) {
	                    alert(xhr.status + ': ' + xhr.statusText);
	                } else {
	                    try {
	                        _this.levels = JSON.parse(xhr.responseText);
	                    } catch (e) {
	                        alert('Incorrect answer: ' + e.message);
	                    }
	                }
	            };
	        }

	        /**
	         * Call the method _load, witch load images.
	         * @param {string|Array} urlOrArr - Take one url or array of urls.
	         * */

	    }, {
	        key: 'load',
	        value: function load(urlOrArr) {
	            var _this2 = this;

	            if (urlOrArr instanceof Array) {
	                urlOrArr.forEach(function (url) {
	                    _this2._load(url);
	                });
	            } else {
	                this._load(urlOrArr);
	            }
	        }

	        /**
	         * Load images into cache and add callbacks into array.
	         * @param {string} url - Contain one url.
	         * */

	    }, {
	        key: '_load',
	        value: function _load(url) {
	            var _this3 = this;

	            if (this.cache[url]) {
	                return cache[url];
	            } else {
	                (function () {
	                    var img = new Image();
	                    img.onload = function () {
	                        _this3.cache[url] = img;

	                        if (_this3._isReady()) {
	                            _this3.readyCallBacks.forEach(function (func) {
	                                func();
	                            });
	                        }
	                    };
	                    _this3.cache[url] = false;
	                    img.src = url;
	                })();
	            }
	        }

	        /**
	         * Get image.
	         * @param {string} url - Contain one url.
	         * @return {Image} Image object.
	         * */

	    }, {
	        key: 'get',
	        value: function get(url) {
	            return this.cache[url];
	        }

	        /**
	         * Check that all images are loaded.
	         * @return {boolean} Ready status.
	         * */

	    }, {
	        key: '_isReady',
	        value: function _isReady() {
	            var ready = true;
	            for (var key in this.cache) {
	                if (this.cache.hasOwnProperty(key) && !this.cache[key]) {
	                    ready = false;
	                }
	            }
	            return ready;
	        }

	        /**
	         * Put callbacks into array.
	         * @param {requestCallback} func - Callback run after loading all images.
	         * */

	    }, {
	        key: 'onReady',
	        value: function onReady(func) {
	            this.readyCallBacks.push(func);
	        }
	    }]);

	    return Data;
	}();

	exports.default = Data;
	;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/** Class representing initialization.*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Init = function () {

	    /**
	     * Create initialization.
	     * */

	    function Init() {
	        _classCallCheck(this, Init);

	        this._playAgain();
	        this._gameLoop();
	        //this._documentReady();
	    }

	    /**
	     * This method is using as callback.
	     * @callback requestCallback.
	     * */

	    _createClass(Init, [{
	        key: '_playAgain',

	        //_documentReady() {
	        //    document.addEventListener('DOMContentLoaded', this._addTowers);
	        //}

	        //_addTowers() {
	        //    console.log('qwe3');
	        //    document.getElementsByClassName('tower').addEventListener('click', function() {
	        //        console.log('qwe2');
	        //    });
	        //}

	        value: function _playAgain() {
	            var _this = this;

	            document.getElementById('play-again').addEventListener('click', function () {
	                _this._reset();
	            });
	        }
	    }, {
	        key: '_reset',
	        value: function _reset() {
	            document.getElementById('game-over_mask').classList.remove('show');

	            this._gameLoop();
	        }

	        /**
	         * @todo After created save method or class, set the level number dynamically.
	         * */

	    }, {
	        key: '_gameLoop',
	        value: function _gameLoop() {
	            new app.gameLoop(Date.now(), 0);
	        }
	    }], [{
	        key: 'startInit',
	        value: function startInit() {
	            new Init();
	        }
	    }]);

	    return Init;
	}();

	exports.default = Init;
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/** Class representing tower.*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tower = function () {

	    /**
	     * Create tower.
	     * @param {number} x - In pixels.
	     * @param {number} y - In pixels.
	     * @param {number} radius - In pixels.
	     * @param {number} rate - Time in seconds to next shoot.
	     * */

	    function Tower(x, y, radius, rate) {
	        _classCallCheck(this, Tower);

	        this.x = x;
	        this.y = y;
	        this.radius = radius;
	        this.size = 40; /** In pixels.*/
	        this.centerX = this.x + this.size / 2;
	        this.centerY = this.y + this.size / 2;
	        this.rate = rate;
	        this.timeNextShoot = 0;
	        this.timeDetectionFirstEnemy = 0;
	    }

	    _createClass(Tower, [{
	        key: 'draw',
	        value: function draw() {
	            app.context.drawImage(app.data.get('img/towers.png'), this.x, this.y);

	            /**
	             * Draw radius of the tower.
	             * */
	            app.context.beginPath();
	            /**
	             * Default draw arc clockwise.
	             * @param x - Center coordinate along the x axis (in pixels).
	             * @param y - Center coordinate along the y axis (in pixels).
	             * @param radius - In pixels.
	             * @param startAngle - In radians.
	             * @param endAngle - In radians.
	             * */
	            app.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
	            app.context.strokeStyle = 'red';
	            app.context.stroke();
	        }
	    }]);

	    return Tower;
	}();

	exports.default = Tower;
	;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/** Class representing enemy.*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Enemy = function () {

	    /**
	     * Create enemy.
	     * @param {number} centerX - In pixels.
	     * @param {number} centerY - In pixels.
	     * @param {number} speed - In pixels per second.
	     * @param {number} health.
	     * @param {Array} steps.
	     * */

	    function Enemy(centerX, centerY, speed, health, steps) {
	        _classCallCheck(this, Enemy);

	        this.centerX = centerX;
	        this.centerY = centerY;
	        this.speed = speed;
	        this.size = 20;
	        this.health = health;
	        this.passedPoints = 0;
	        this.steps = steps;

	        this._centerCoord();
	    }

	    _createClass(Enemy, [{
	        key: '_centerCoord',
	        value: function _centerCoord() {
	            this.x = this.centerX - this.size / 2;
	            this.y = this.centerY - this.size / 2;
	        }

	        /**
	         * Move enemy.
	         * @param {number} date - Increment date from method _frame.
	         * @param {string} direction.
	         * */

	    }, {
	        key: 'move',
	        value: function move(date, direction) {
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
	    }, {
	        key: 'draw',
	        value: function draw() {
	            app.context.drawImage(app.data.get('img/enemies.png'), this.x, this.y);
	        }
	    }]);

	    return Enemy;
	}();

	exports.default = Enemy;
	;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/** Class representing shell.*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shell = function () {

	    /**
	     * Create shell.
	     * @param {number} centerX - In pixels.
	     * @param {number} centerY - In pixels.
	     * @param {number} enemyCenterX - In pixels.
	     * @param {number} enemyCenterY - In pixels.
	     * @param {number} speed - In pixels per second
	     * @param {number} size - In pixels.
	     * @param {number} damage
	     * */

	    function Shell(centerX, centerY, enemyCenterX, enemyCenterY, speed, size, damage) {
	        _classCallCheck(this, Shell);

	        this.centerX = centerX;
	        this.centerY = centerY;
	        this.enemyCenterX = enemyCenterX;
	        this.enemyCenterY = enemyCenterY;
	        this.angle = Math.atan2(this.centerY - this.enemyCenterY, this.enemyCenterX - this.centerX);
	        this.startCenterX = this.centerX;
	        this.speed = speed;
	        this.size = size;
	        this.damage = damage;

	        this._leftTopCoord();
	    }

	    _createClass(Shell, [{
	        key: '_leftTopCoord',
	        value: function _leftTopCoord() {
	            this.x = this.centerX - this.size / 2;
	            this.y = this.centerY - this.size / 2;
	        }

	        /**
	         * Move shell.
	         * @param {number} date - Increment date from method _frame.
	         * */

	    }, {
	        key: 'move',
	        value: function move(date) {
	            var angle = undefined,
	                k = 1,
	                dx = undefined;
	            if (this.enemyCenterX - this.startCenterX > 0) {
	                angle = this.angle;
	            } else {
	                angle = Math.PI - this.angle;
	                k = -1;
	            }

	            dx = Math.sqrt(Math.pow(this.speed * date, 2) / (1 + Math.pow(Math.tan(angle), 2)));
	            this.centerX += dx * k;
	            this.centerY -= dx * Math.tan(angle);

	            this._leftTopCoord();
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            app.context.drawImage(app.data.get('img/shells.png'), this.x, this.y);
	        }
	    }]);

	    return Shell;
	}();

	exports.default = Shell;
	;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/** Class representing explosion.*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Explosion = function () {

	    /**
	     * Create explosion.
	     * @param {number} centerEnemyX - In pixels.
	     * @param {number} centerEnemyY - In pixels.
	     * */

	    function Explosion(centerEnemyX, centerEnemyY) {
	        _classCallCheck(this, Explosion);

	        this.centerEnemyX = centerEnemyX;
	        this.centerEnemyY = centerEnemyY;
	        this.size = 40;
	        this.x = this.centerEnemyX - this.size / 2;
	        this.y = this.centerEnemyY - this.size / 2;
	        this.amountFramesDrawing = 0;
	        /**
	         * Duration of explosion (in frames).
	         *
	         * @todo Change in sprite.
	         * */
	        this.maxAmountFramesDrawing = 10;
	    }

	    _createClass(Explosion, [{
	        key: 'draw',
	        value: function draw() {
	            app.context.drawImage(app.data.get('img/explosions.png'), this.x, this.y);
	        }
	    }]);

	    return Explosion;
	}();

	exports.default = Explosion;
	;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	/** Class representing map.*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Map = function () {

	    /**
	     * Create level.
	     * @param {number} levelNumber.
	     * */

	    function Map(levelNumber) {
	        _classCallCheck(this, Map);

	        this.levelNumber = levelNumber;
	        this.level = app.data.levels[this.levelNumber];
	    }

	    _createClass(Map, [{
	        key: 'draw',
	        value: function draw() {
	            app.context.drawImage(app.data.get('img/bglevel-' + (this.levelNumber + 1) + '.png'), 0, 0);
	        }
	    }]);

	    return Map;
	}();

	exports.default = Map;
	;

/***/ }
/******/ ]);