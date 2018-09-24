//////////////
// Imports
//////////////
import { SnakeBit } from './snakebit.js';

/**
 * Snake class
 *  The main character of the snake game
 */
export class Snake {

  constructor(x, y) {
    this.origin = { x, y };
    this.respawn();
  }

  /**
   * Allow the snake to grow
   */
  grow() {
    this.body.push(new SnakeBit(this.body[0].x, this.body[0].y));
  }

  /**
   * Set the snake's direction
   *  @param x x-speed
   *  @param y y-speed
   */
  setDirection(x, y) {
    // Don't allow snake to set direction on itself!
    this.speedX = (x === this.speedX * -1) ? this.speedX : x;
    this.speedY = (y === this.speedY * -1) ? this.speedY : y;
  }

  /**
   * Move the snake in the snake's current direction
   *  @param max the max boundaries for the snake (x,y)
   *  @param min this min boundaries for the snake (x,y)
   */
  move(min, max) {
    let head = this.body[0];
    let newPosX = head.x + this.speedX;
    let newPosY = head.y + this.speedY;

    // Ensure the snake will stay within the boundaries of the game
    if (newPosX < max.x && newPosY < max.y) {
      if (newPosX >= min.x && newPosY >= min.y) {
        for (let i = this.body.length - 1; i > 0; i--) {
          this.body[i].x = this.body[i - 1].x;
          this.body[i].y = this.body[i - 1].y;
        }

        head.x = newPosX;
        head.y = newPosY;
      } else this.respawn();
    } else this.respawn();

    // Ensure the snake will not eat itself
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        this.respawn();
        return;
      }
    }
  }

  /**
   * Respawn the snake with its original body
   */
  respawn() {
    this.speedX = 0;
    this.speedY = 0;
    this.body = [];
    this.body.push(new SnakeBit(this.origin.x, this.origin.y));
  }
}