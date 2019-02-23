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

  clearAllPixels() {
    Object.values(this.pixels).forEach(pixels => {
      Object.values(pixels).forEach(pixel => this.clearPixel(pixel));
    });
  }

  addPixel(...pixels) {
    pixels.forEach(pixel => {
      this.pixels[pixel.x] = this.pixels[pixel.x] || {};
      this.pixels[pixel.x][pixel.y] = pixel;
      this.drawPixel(pixel);
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

    this.ctx.clearRect(...this.getPixelDimensions(pixel));
  }

  drawPixel(pixel) {
    this.ctx.fillStyle = pixel.color;
    this.ctx.fillRect(...this.getPixelDimensions(pixel));
  }

  getPixelDimensions(pixel) {
    return [
      pixel.x * this.pixelSize,
      pixel.y * this.pixelSize,
      this.pixelSize,
      this.pixelSize
    ];
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