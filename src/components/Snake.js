import directions from '../directions';
import keys from '../keys';
import pixelTypes from '../pixelTypes';
import Pixel from './Pixel';

class Snake {
  constructor(pixel) {
    this.pixels = [];
    this.head = null;
    this.direction = null;
    this.nextDirection = '';

    this.addHead(pixel);
    document.addEventListener('keydown', this.setNextDirection.bind(this));
  }

  addHead(pixel) {
    pixel.color = '#000';
    this.pixels.push(pixel);
    this.head = pixel;

    return this.head;
  }

  removeTail() {
    return this.pixels.shift();
  }

  setNextDirection(event) {
    const nextDirection = directions[keys[event.keyCode]]
    if (nextDirection) {
      this.nextDirection = nextDirection;
    }
  }

  getNextMove() {
    if (!(
      this.direction === directions.LEFT && this.nextDirection === directions.RIGHT ||
      this.direction === directions.RIGHT && this.nextDirection === directions.LEFT ||
      this.direction === directions.UP && this.nextDirection === directions.DOWN ||
      this.direction === directions.DOWN && this.nextDirection === directions.UP)
    ) {
      this.direction = this.nextDirection;
    }

    let x = this.head.x;
    let y = this.head.y;

    switch (this.direction) {
      case directions.LEFT:
        x--;
        break;
      case directions.UP:
        y--
        break;
      case directions.RIGHT:
        x++;
        break;
      case directions.DOWN:
        y++;
        break;
      default:
        break;
    }

    return new Pixel(x, y);
  }
}

export default Snake;