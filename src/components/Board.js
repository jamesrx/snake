import Pixel from './Pixel';

class Board {
  constructor(width, height, containerEl) {
    this.width = width;
    this.height = height;
    this.pixelSize = 20;
    this.pixels = {};

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    containerEl.appendChild(canvas);
    this.ctx = canvas.getContext('2d');
  }

  draw() {
    this.ctx.fillStyle = '#85ca00';
    this.ctx.fillRect(0, 0, this.width, this.height);

    Object.values(this.pixels).forEach(pixels => {
      Object.values(pixels).forEach(pixel => {
        this.ctx.fillStyle = pixel.color;
        this.ctx.fillRect(pixel.x * this.pixelSize, pixel.y * this.pixelSize, this.pixelSize, this.pixelSize);
      });
    })
  }

  addPixels(...pixels) {
    pixels.forEach(pixel => {
      this.pixels[pixel.x] = this.pixels[pixel.x] || {};
      this.pixels[pixel.x][pixel.y] = pixel;
    });
  }

  findEmptyPixel() {
    const emptyPixels = [];

    for (let i = 0; i < this.width / this.pixelSize; i++) {
      for (let j = 0; j < this.height / this.pixelSize; j++) {
        let pixel = new Pixel(i, j);
        if (!(this.pixels[i] && this.pixels[i][j])) {
          emptyPixels.push(pixel);
        }
      }
    }

    return emptyPixels[Math.floor(Math.random() * emptyPixels.length)];
  }

  getPixel(pixel) {
    return (this.pixels[pixel.x] && this.pixels[pixel.x][pixel.y]) || pixel;
  }

  clearPixel(pixel) {
    delete this.pixels[pixel.x][pixel.y];
    if (!Object.keys(this.pixels[pixel.x]).length) {
      delete this.pixels[pixel.x];
    }
  }

  isOutOfBounds(pixel) {
    if (
      pixel.x < 0 ||
      pixel.y < 0 ||
      pixel.x * this.pixelSize >= this.width ||
      pixel.y * this.pixelSize >= this.height
    ) {
      return true
    }

    return false;
  }
}

export default Board;