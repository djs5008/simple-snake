//////////////
// Imports
//////////////
import { Snake } from './snake.js';
import { Food } from './food.js';

//////////////
// Constants
//////////////
const CANVAS_WIDTH  = 500;  // Width of canvas
const CANVAS_HEIGHT = 500;  // Height of canvas
const UPDATE_RATE   = 75;   // Rate of game-logic updates
const BITSIZE       = 20;   // Size of snake bits
const BOARD_WIDTH   = CANVAS_WIDTH / BITSIZE;
const BOARD_HEIGHT  = CANVAS_HEIGHT / BITSIZE;

/**
 * Game class
 *  The main component of the snake game
 */
class Game {

  constructor() {
    this.stage  = new createjs.StageGL('game');
    this.buffer = new createjs.Shape();
    this.snake  = new Snake(Math.floor((BOARD_WIDTH / 2)), Math.floor((BOARD_HEIGHT / 2)));
    this.food   = undefined;

    // Add buffer to stage
    this.stage.addChild(this.buffer);

    // Set StageGL ticker action
    createjs.Ticker.on('tick', this.draw.bind(this));
    createjs.Ticker.framerate = 60;

    // Handle keyboard input
    document.onkeydown = this.handleKeyPressed.bind(this);

    // Start game loop
    setInterval(() => {
      this.update();
    }, UPDATE_RATE);
  }

  /**
   * Handle keyboard input
   */
  handleKeyPressed(event) {

    const KEYCODE_LEFT  = 37, 
		      KEYCODE_RIGHT = 39,
		      KEYCODE_UP    = 38, 
          KEYCODE_DOWN  = 40;
    
    switch (event.keyCode) {
      case KEYCODE_UP:
        this.snake.setDirection(0, -1);
        break;
      case KEYCODE_DOWN:
        this.snake.setDirection(0, 1);
        break;
      case KEYCODE_LEFT:
        this.snake.setDirection(-1, 0);
        break;
      case KEYCODE_RIGHT:
        this.snake.setDirection(1, 0);
        break;
    }
  }

  /**
   * Spawn food for the snake
   */
  spawnFood() {
    let foodX = Math.floor(Math.random() * BOARD_WIDTH);
    let foodY = Math.floor(Math.random() * BOARD_HEIGHT);
    
    // Check if we just spawned the food on an area already occupied
    let mustRespawn = false;
    this.snake.body.forEach(bit => {
      if (foodX === bit.x && foodY === bit.y) {
        mustRespawn = true;
        return;
      }
    });

    // If occupied, respawn
    //  Otherwise, spawn the food there
    if (mustRespawn) {
      setTimeout(() => {
        this.spawnFood();
      }, 0);
    } else {
      this.food = new Food(foodX, foodY);
    }
  }

  /**
   * Handle game logic updating
   */
  update() {
    // Respawn food
    if (this.food == null) {
      this.spawnFood();
    } else {
      // Eat food
      if (this.snake.body[0].x === this.food.x) {
        if (this.snake.body[0].y === this.food.y) {
          this.food = undefined;
          this.snake.grow();
        }
      }
    }

    // Update snake position
    let boundaries_min = { x: 0, y: 0 };
    let boundaries_max = { x: BOARD_WIDTH, y: BOARD_HEIGHT };
    this.snake.move(boundaries_min, boundaries_max);
  }

  /**
   * Render each frame from game data
   */
  draw() {
    // Clear previously rendered frames
    this.buffer.graphics.clear();

    // Draw background
    this.buffer.graphics.beginFill('black');
    this.buffer.graphics.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.buffer.graphics.endFill();

    // Draw snake
    let opacity = 1.0;
    this.snake.body.forEach(bit => {
      this.buffer.graphics.beginFill('rgba(255,255,255,' + opacity + ')');
      this.buffer.graphics.drawRect(bit.x * BITSIZE, bit.y * BITSIZE, BITSIZE, BITSIZE);
      this.buffer.graphics.endFill();
      opacity -= 1.0 / (this.snake.body.length + (this.snake.body.length / 5));
    });

    // Draw food
    // ( Food may be undefined, if so handle on next game update )
    if (this.food != null) {
      this.buffer.graphics.beginFill('hsl(' + this.food.hue + ', 100%, 50%)');
      this.buffer.graphics.drawRect(this.food.x * BITSIZE, this.food.y * BITSIZE, BITSIZE, BITSIZE);
      this.buffer.graphics.endFill();
      this.food.hue = (this.food.hue + 2 % 360);
    }

    // Update stage to reflect new buffer
    this.buffer.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.stage.update();
  }
}

// Start the game
document.body.onload = () => {
  console.log('Starting game...');
  new Game();
}