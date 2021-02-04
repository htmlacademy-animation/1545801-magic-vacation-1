import CanvasObject from './display-object';

export default class extends CanvasObject {
  constructor(image, props) {
    super(props);
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
}
