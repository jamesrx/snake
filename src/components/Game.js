import Board from './Board';
import Food from './Food';
import Snake from './Snake';
import pixelTypes from '../pixelTypes';

class Game {
  constructor(width, height, fps) {
    this.containerEl = document.getElementById('game-container');
    this.scoreEl = document.querySelector('.current-score');
    this.highScoreEl = document.querySelector('.high-score');
    this.gameOverEl = document.querySelector('.game-over');

    this.board = new Board(width, height, document.getElementById('board-container'));
    this.fps = fps;
    this.point_value = 100;

    this.GAME_OVER_CLASS = 'game-container--game-over';
    this.HIGH_SCORE_CLASS = 'game-over--high-score';

    document.querySelector('.game-over__play-again-btn').addEventListener('click', () => this.start());
  }

  start() {
    this.containerEl.classList.remove(this.GAME_OVER_CLASS);
    this.gameOverEl.classList.remove(this.HIGH_SCORE_CLASS);
    this.score = 0;
    this.highScore = localStorage.getItem('highScore') || 0;
    this.board.pixels = {};

    this.snake = new Snake(this.board.findEmptyPixel());
    this.board.addPixels(
      new Food(this.board.findEmptyPixel()),
      ...this.snake.pixels,
    );
    this.board.draw();    
    this.scoreEl.innerText = this.score;
    this.highScoreEl.innerText = this.highScore;

    this.startAnimation();
  }

  startAnimation() {
    let then = Date.now();
    const fpsInterval = 1000 / this.fps;
    const animateFrame = () => {
      this.animationId = requestAnimationFrame(animateFrame);
  
      const now = Date.now();
      const elapsed = now - then;
  
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        this.updateFrame();
      }
    }

    animateFrame();
  }

  updateFrame() {
    if (this.snake.nextDirection) {
      const nextPixel = this.board.getPixel(this.snake.findMove());

      if (this.board.isOutOfBounds(nextPixel) || nextPixel.type === pixelTypes.SNAKE) {
        this.gameOver();
        return false;
      }

      if (nextPixel.type === pixelTypes.FOOD) {
        this.score += this.point_value;
        this.scoreEl.innerText = this.score;
        this.board.addPixels(new Food(this.board.findEmptyPixel()));
      } else {
        this.board.clearPixel(this.snake.removeTail());
      }

      this.snake.addHead(nextPixel);
      this.board.addPixels(...this.snake.pixels);
      this.board.draw();
    }
  }

  gameOver() {
    cancelAnimationFrame(this.animationId);
    if (this.score > this.highScore) {
      localStorage.setItem('highScore', this.score);
      this.gameOverEl.classList.add(this.HIGH_SCORE_CLASS);
    }

    this.containerEl.classList.add(this.GAME_OVER_CLASS);
  }
}

export default Game;