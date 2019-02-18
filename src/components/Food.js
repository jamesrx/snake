import pixelTypes from '../pixelTypes';

class Food {
  constructor(pixel) {
    pixel.color = '#ff0000';
    pixel.type = pixelTypes.FOOD;
    return pixel;
  }
}

export default Food;