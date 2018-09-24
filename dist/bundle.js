/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/food.js":
/*!************************!*\
  !*** ./src/js/food.js ***!
  \************************/
/*! exports provided: Food */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Food\", function() { return Food; });\n/**\r\n * Food class\r\n *  The \"pickup\" of the game\r\n */\r\nclass Food {\r\n  \r\n  constructor(x, y) {\r\n    this.x = x;\r\n    this.y = y;\r\n    this.hue = 0;\r\n  }\r\n\r\n}\n\n//# sourceURL=webpack:///./src/js/food.js?");

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake.js */ \"./src/js/snake.js\");\n/* harmony import */ var _food_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food.js */ \"./src/js/food.js\");\n//////////////\r\n// Imports\r\n//////////////\r\n\r\n\r\n\r\n//////////////\r\n// Constants\r\n//////////////\r\nconst CANVAS_WIDTH  = 500;  // Width of canvas\r\nconst CANVAS_HEIGHT = 500;  // Height of canvas\r\nconst UPDATE_RATE   = 100; // Rate of game-logic updates\r\nconst BITSIZE       = 20;   // Size of snake bits\r\n\r\n/**\r\n * Game class\r\n *  The main component of the snake game\r\n */\r\nclass Game {\r\n\r\n  constructor() {\r\n    this.stage  = new createjs.StageGL('game');\r\n    this.buffer = new createjs.Shape();\r\n    this.snake  = new _snake_js__WEBPACK_IMPORTED_MODULE_0__[\"Snake\"](Math.floor(((CANVAS_WIDTH / BITSIZE) / 2)), Math.floor(((CANVAS_HEIGHT / BITSIZE) / 2)));\r\n    this.food   = undefined;\r\n\r\n    // Add buffer to stage\r\n    this.stage.addChild(this.buffer);\r\n\r\n    // Set StageGL ticker action\r\n    createjs.Ticker.on('tick', this.draw.bind(this));\r\n    createjs.Ticker.framerate = 60;\r\n\r\n    // Handle keyboard input\r\n    document.onkeydown = this.handleKeyPressed.bind(this);\r\n\r\n    // Start game loop\r\n    setInterval(() => {\r\n      this.update();\r\n    }, UPDATE_RATE);\r\n  }\r\n\r\n  /**\r\n   * Handle keyboard input\r\n   */\r\n  handleKeyPressed(event) {\r\n\r\n    const KEYCODE_LEFT  = 37, \r\n\t\t      KEYCODE_RIGHT = 39,\r\n\t\t      KEYCODE_UP    = 38, \r\n          KEYCODE_DOWN  = 40;\r\n    \r\n    switch (event.keyCode) {\r\n      case KEYCODE_UP:\r\n        this.snake.setDirection(0, -1);\r\n        break;\r\n      case KEYCODE_DOWN:\r\n        this.snake.setDirection(0, 1);\r\n        break;\r\n      case KEYCODE_LEFT:\r\n        this.snake.setDirection(-1, 0);\r\n        break;\r\n      case KEYCODE_RIGHT:\r\n        this.snake.setDirection(1, 0);\r\n        break;\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Spawn food for the snake\r\n   */\r\n  spawnFood() {\r\n    let randX = Math.floor(Math.random() * CANVAS_WIDTH);\r\n    let randY = Math.floor(Math.random() * CANVAS_HEIGHT);\r\n    let foodX = randX - (randX % BITSIZE);\r\n    let foodY = randY - (randY % BITSIZE);\r\n    \r\n    // Check if we just spawned the food on an area already occupied\r\n    let mustRespawn = false;\r\n    this.snake.body.forEach(bit => {\r\n      if (foodX / BITSIZE === bit.x && foodY / BITSIZE === bit.y) {\r\n        mustRespawn = true;\r\n        return;\r\n      }\r\n    });\r\n\r\n    // If occupied, respawn\r\n    //  Otherwise, spawn the food there\r\n    if (mustRespawn) {\r\n      setTimeout(() => {\r\n        this.spawnFood();\r\n      }, 0);\r\n    } else {\r\n      this.food = new _food_js__WEBPACK_IMPORTED_MODULE_1__[\"Food\"](foodX, foodY);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Handle game logic updating\r\n   */\r\n  update() {\r\n    // Respawn food\r\n    if (this.food == null) {\r\n      this.spawnFood();\r\n    } else {\r\n      // Eat food\r\n      if (this.snake.body[0].x === this.food.x / BITSIZE) {\r\n        if (this.snake.body[0].y === this.food.y / BITSIZE) {\r\n          this.food = undefined;\r\n          this.snake.grow();\r\n        }\r\n      }\r\n    }\r\n\r\n    // Update snake position\r\n    let boundaries_min = { x: 0, y: 0 };\r\n    let boundaries_max = { x: CANVAS_WIDTH/BITSIZE, y: CANVAS_HEIGHT/BITSIZE };\r\n    this.snake.move(boundaries_min, boundaries_max);\r\n  }\r\n\r\n  /**\r\n   * Render each frame from game data\r\n   */\r\n  draw() {\r\n    // Clear previously rendered frames\r\n    this.buffer.graphics.clear();\r\n\r\n    // Draw background\r\n    this.buffer.graphics.beginFill('black');\r\n    this.buffer.graphics.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);\r\n    this.buffer.graphics.endFill();\r\n\r\n    // Draw snake\r\n    let opacity = 1.0;\r\n    this.snake.body.forEach(bit => {\r\n      this.buffer.graphics.beginFill('rgba(255,255,255,' + opacity + ')');\r\n      this.buffer.graphics.drawRect(bit.x * BITSIZE, bit.y * BITSIZE, BITSIZE, BITSIZE);\r\n      this.buffer.graphics.endFill();\r\n      opacity -= 1.0 / (this.snake.body.length + (this.snake.body.length / 5));\r\n    });\r\n\r\n    // Draw food\r\n    // ( Food may be undefined, if so handle on next game update )\r\n    if (this.food != null) {\r\n      this.buffer.graphics.beginFill('hsl(' + this.food.hue + ', 100%, 50%)');\r\n      this.buffer.graphics.drawRect(this.food.x, this.food.y, BITSIZE, BITSIZE);\r\n      this.buffer.graphics.endFill();\r\n      this.food.hue = (this.food.hue + 2 % 360);\r\n    }\r\n\r\n    // Update stage to reflect new buffer\r\n    this.buffer.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);\r\n    this.stage.update();\r\n  }\r\n}\r\n\r\n// Start the game\r\ndocument.body.onload = () => {\r\n  console.log('Starting game...');\r\n  new Game();\r\n}\n\n//# sourceURL=webpack:///./src/js/game.js?");

/***/ }),

/***/ "./src/js/snake.js":
/*!*************************!*\
  !*** ./src/js/snake.js ***!
  \*************************/
/*! exports provided: Snake */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Snake\", function() { return Snake; });\n/* harmony import */ var _snakebit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snakebit.js */ \"./src/js/snakebit.js\");\n//////////////\r\n// Imports\r\n//////////////\r\n\r\n\r\n/**\r\n * Snake class\r\n *  The main character of the snake game\r\n */\r\nclass Snake {\r\n\r\n  constructor(x, y) {\r\n    this.origin = { x, y };\r\n    this.respawn();\r\n  }\r\n\r\n  /**\r\n   * Allow the snake to grow\r\n   */\r\n  grow() {\r\n    this.body.push(new _snakebit_js__WEBPACK_IMPORTED_MODULE_0__[\"SnakeBit\"](this.body[0].x, this.body[0].y));\r\n  }\r\n\r\n  /**\r\n   * Set the snake's direction\r\n   *  @param x x-speed\r\n   *  @param y y-speed\r\n   */\r\n  setDirection(x, y) {\r\n    // Don't allow snake to set direction on itself!\r\n    this.speedX = (x === this.speedX * -1) ? this.speedX : x;\r\n    this.speedY = (y === this.speedY * -1) ? this.speedY : y;\r\n  }\r\n\r\n  /**\r\n   * Move the snake in the snake's current direction\r\n   *  @param max the max boundaries for the snake (x,y)\r\n   *  @param min this min boundaries for the snake (x,y)\r\n   */\r\n  move(min, max) {\r\n    let head = this.body[0];\r\n    let newPosX = head.x + this.speedX;\r\n    let newPosY = head.y + this.speedY;\r\n\r\n    // Ensure the snake will stay within the boundaries of the game\r\n    if (newPosX < max.x && newPosY < max.y) {\r\n      if (newPosX >= min.x && newPosY >= min.y) {\r\n        for (let i = this.body.length - 1; i > 0; i--) {\r\n          this.body[i].x = this.body[i - 1].x;\r\n          this.body[i].y = this.body[i - 1].y;\r\n        }\r\n\r\n        head.x = newPosX;\r\n        head.y = newPosY;\r\n      } else this.respawn();\r\n    } else this.respawn();\r\n\r\n    // Ensure the snake will not eat itself\r\n    for (let i = 1; i < this.body.length; i++) {\r\n      if (head.x === this.body[i].x && head.y === this.body[i].y) {\r\n        this.respawn();\r\n        return;\r\n      }\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Respawn the snake with its original body\r\n   */\r\n  respawn() {\r\n    this.speedX = 0;\r\n    this.speedY = 0;\r\n    this.body = [];\r\n    this.body.push(new _snakebit_js__WEBPACK_IMPORTED_MODULE_0__[\"SnakeBit\"](this.origin.x, this.origin.y));\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/js/snake.js?");

/***/ }),

/***/ "./src/js/snakebit.js":
/*!****************************!*\
  !*** ./src/js/snakebit.js ***!
  \****************************/
/*! exports provided: SnakeBit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SnakeBit\", function() { return SnakeBit; });\n/**\r\n * SnakeBit class\r\n *  The components that make up the body of the snake\r\n */\r\nclass SnakeBit {\r\n\r\n  constructor(x, y) {\r\n    this.x = x;\r\n    this.y = y;\r\n  }\r\n\r\n}\n\n//# sourceURL=webpack:///./src/js/snakebit.js?");

/***/ })

/******/ });