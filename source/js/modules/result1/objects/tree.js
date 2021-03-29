import animate from '../../canvas-lib/animate';
import CanvasImage from '../../canvas-lib/displayObjects/image';

export default class extends CanvasImage {
  constructor(image, props) {
    super(image, props);
  }

  show(duration, endCB = () => {}) {
    const from = {
      scaleY: this.scaleY * 0.1,
    };
    const to = {
      scaleY: this.scaleY,
    };

    this.set(from);
    animate(this, {
      duration,
      props: to,
      onComplete: endCB,
    });
  }
}
