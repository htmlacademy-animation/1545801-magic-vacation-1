import CanvasGraphics from '../../canvas-lib/displayObjects/graphics';

export default class extends CanvasGraphics {
  constructor(key) {
    const props = {
      width: key.width,
      height: key.height,
      scaleX: key.scaleX,
      scaleY: key.scaleY,
      x: key.x,
      y: key.y,
    };

    super(props);

    this.clear();
    this.fillStyle(`#acc3ff`);
    this.beginPath();
    this.arc(key.width * 0.51, key.width * 0.49, key.width * 0.49, 0, 180/* , Math.PI / 2, Math.PI * 3 / 2 */);
    this.moveTo(key.width * 0.7, key.height * 0.1);
    this.lineTo(key.width, key.height);
    this.lineTo(key.width, key.height * 1.2);
    this.lineTo(key.width * -2, key.height * 1.2);
    this.lineTo(key.width * -2, 0);
    this.fill();
  }
}
