import animate from '../../canvas-lib/animate';
import CanvasGraphics from '../../canvas-lib/displayObjects/graphics';

export default class extends CanvasGraphics {
  show(duration, endCB = () => {}) {
    this.alpha = 0;
    animate(this, {
      duration,
      props: {
        alpha: 1
      },
      onComplete: endCB,
    });
  }
}
