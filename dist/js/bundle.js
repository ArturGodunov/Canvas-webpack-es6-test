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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameLoop = function () {
	    function GameLoop(lastTime) {
	        _classCallCheck(this, GameLoop);

	        this.canvasWidth = document.getElementById('canvas').offsetWidth;
	        this.canvasHeight = document.getElementById('canvas').offsetHeight;
	        this.gameOverMaskClass = document.getElementById('game-over_mask').className;
	        this.gameTime = 0;
	        this.lastTime = lastTime;
	        this.towers = [];
	        this.shells = [];
	        this.enemies = [];
	        this.explosions = [];
	        this.amountEnemies = 1; //общее кол-во врагов на карте
	        this.maxAmountEnemiesPass = 30; // допустимое max кол-во пропущенных врагов
	        this.amountEnemiesPass = 0; // начальное кол-во пропущенных врагов
	        this.isGameOver = false;

	        this._frame();
	    }

	    _createClass(GameLoop, [{
	        key: '_frame',
	        value: function _frame() {
	            var now = Date.now();
	            this.date = (now - this.lastTime) / 1000;

	            // пока хардкордно добавляю 1 башню.
	            // потом сдлелать метод добавления башень.
	            if (this.towers < 1) {
	                this.towers.push(new app.tower(340, 160, 100, 25));
	            }

	            this._update();
	            this._render();

	            if (this.isGameOver) {
	                return;
	            }

	            this.lastTime = now;
	            requestAnimationFrame(this._frame.bind(this)); //bind от потери контекста (иначе будет в контексте window)
	        }
	    }, {
	        key: '_update',
	        value: function _update() {
	            this.gameTime += this.date;

	            this._updateEnemies();
	            this._updateShells();
	            this._updateExplosions();
	            this._updateTowers();

	            //if (Math.random() < 1 - Math.pow(.993, this.gameTime)) {
	            //    this.enemies.push(new app.enemy(document.getElementById('canvas').width, 100));
	            //}
	            if (this.enemies.length < this.amountEnemies) {
	                this.enemies.push(new app.enemy(this.canvasWidth, 100, 50, 100));
	            }

	            this._checkCollisions();
	        }
	    }, {
	        key: '_updateEnemies',
	        value: function _updateEnemies() {
	            for (var i = 0; i < this.enemies.length; i++) {
	                this.enemies[i].move(this.date);

	                if (this.enemies[i].x + this.enemies[i].size < 0) {
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
	                this.shells[i].move(this.date);

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
	        key: '_updateTowers',
	        value: function _updateTowers() {
	            for (var i = 0; i < this.towers.length; i++) {
	                this.towers[i].framesBeforeShoot++;
	            }
	        }
	    }, {
	        key: '_checkCollisions',
	        value: function _checkCollisions() {
	            this._checkEnemiesMaxPass();
	            this._checkIntersectionCircles();
	            this._checkCollisionsEnemiesShells();
	        }
	    }, {
	        key: '_checkEnemiesMaxPass',
	        value: function _checkEnemiesMaxPass() {
	            if (this.amountEnemiesPass === this.maxAmountEnemiesPass) {
	                this._gameOver();
	            }
	        }
	    }, {
	        key: '_checkIntersectionCircles',
	        value: function _checkIntersectionCircles() {
	            for (var i = 0; i < this.towers.length; i++) {
	                for (var j = 0; j < this.enemies.length; j++) {
	                    var enemyCenterX = this.enemies[j].centerX,
	                        enemyCenterY = this.enemies[j].centerY,
	                        towerCenterX = this.towers[i].centerX,
	                        towerCenterY = this.towers[i].centerY,
	                        a = Math.pow(enemyCenterX - towerCenterX, 2) + Math.pow(enemyCenterY - towerCenterY, 2),
	                        b = Math.pow(this.towers[i].radius, 2);
	                    if (a <= b) {
	                        if (this.towers[i].framesBeforeShoot >= this.towers[i].rate) {
	                            this.shells.push(new app.shell(towerCenterX, towerCenterY, enemyCenterX, enemyCenterY, 200, 10, 50));
	                            this.towers[i].framesBeforeShoot = 0;
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
	            app.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

	            app.context.drawImage(app.data.get('img/bglevel-1.png'), 0, 0); // пока хардкорно отрисовывается первый уровень

	            for (var i = 0; i < this.towers.length; i++) {
	                this.towers[i].draw();
	            }

	            for (var i = 0; i < this.enemies.length; i++) {
	                //console.log(this.enemies[i].centerX, this.enemies[i].centerY);
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
	            this.gameOverMaskClass = this.gameOverMaskClass + ' show';
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Data = function () {
	    function Data() {
	        _classCallCheck(this, Data);

	        this.cache = {};
	        this.readyCallBacks = [];
	    }

	    _createClass(Data, [{
	        key: 'load',
	        value: function load(urlOrArr) {
	            var _this = this;

	            if (urlOrArr instanceof Array) {
	                urlOrArr.forEach(function (url) {
	                    _this._load(url);
	                });
	            } else {
	                this._load(urlOrArr);
	            }
	        }
	    }, {
	        key: '_load',
	        value: function _load(url) {
	            var _this2 = this;

	            if (this.cache[url]) {
	                return cache[url];
	            } else {
	                (function () {
	                    var img = new Image();
	                    img.onload = function () {
	                        _this2.cache[url] = img;

	                        if (_this2._isReady()) {
	                            _this2.readyCallBacks.forEach(function (func) {
	                                func();
	                            });
	                        }
	                    };
	                    _this2.cache[url] = false;
	                    img.src = url;
	                })();
	            }
	        }
	    }, {
	        key: 'get',
	        value: function get(url) {
	            return this.cache[url];
	        }
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Init = function () {
	    function Init() {
	        _classCallCheck(this, Init);

	        this._playAgain();
	        this._reset();
	        this._gameLoop();
	    }

	    _createClass(Init, [{
	        key: '_playAgain',
	        value: function _playAgain() {
	            document.getElementById('play-again').addEventListener('click', function () {
	                this._reset();
	            });
	        }
	    }, {
	        key: '_reset',
	        value: function _reset() {}
	    }, {
	        key: '_gameLoop',
	        value: function _gameLoop() {
	            new app.gameLoop(Date.now());
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tower = function () {
	    function Tower(x, y, radius, rate) {
	        _classCallCheck(this, Tower);

	        this.x = x;
	        this.y = y;
	        this.radius = radius;
	        this.size = 40;
	        this.centerX = this.x + this.size / 2;
	        this.centerY = this.y + this.size / 2;
	        this.rate = rate;
	        this.framesBeforeShoot = this.rate;
	    }

	    _createClass(Tower, [{
	        key: 'draw',
	        value: function draw() {
	            app.context.drawImage(app.data.get('img/towers.png'), this.x, this.y);

	            app.context.beginPath();
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Enemy = function () {
	    function Enemy(x, y, speed, health) {
	        _classCallCheck(this, Enemy);

	        this.x = x;
	        this.y = y;
	        this.speed = speed; // Speed in pixels per second
	        this.size = 40;
	        this.health = health;

	        this._centerCoord();
	    }

	    _createClass(Enemy, [{
	        key: '_centerCoord',
	        value: function _centerCoord() {
	            this.centerX = this.x + this.size / 2;
	            this.centerY = this.y + this.size / 2;
	        }
	    }, {
	        key: 'move',
	        value: function move(date) {
	            this._centerCoord();

	            this.x -= this.speed * date; // пока движется только по прямой
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shell = function () {
	    function Shell(centerX, centerY, enemyCenterX, enemyCenterY, speed, size, damage) {
	        _classCallCheck(this, Shell);

	        this.centerX = centerX;
	        this.centerY = centerY;
	        this.enemyCenterX = enemyCenterX;
	        this.enemyCenterY = enemyCenterY;
	        this.angle = Math.atan2(this.centerY - this.enemyCenterY, this.enemyCenterX - this.centerX);
	        this.startCenterX = this.centerX;
	        this.speed = speed; // Speed in pixels per second
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Explosion = function () {
	    function Explosion(centerEnemyX, centerEnemyY) {
	        _classCallCheck(this, Explosion);

	        this.centerEnemyX = centerEnemyX;
	        this.centerEnemyY = centerEnemyY;
	        this.size = 40;
	        this.x = this.centerEnemyX - this.size / 2;
	        this.y = this.centerEnemyY - this.size / 2;
	        this.maxAmountFramesDrawing = 10; // кол-во кадров в течении которых взрыв будет отрисовываться. потом надо будет переделать на спрайты.
	        this.amountFramesDrawing = 0;
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

/***/ }
/******/ ]);