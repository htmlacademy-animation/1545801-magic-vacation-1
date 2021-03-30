import animate from '../../canvas-lib/animate';
import CanvasImage from '../../canvas-lib/displayObjects/image';

export default class extends CanvasImage {
  stopAnimations() {
    this.isStopAnimation = true;
  }

  move(x, y, duration, easing, endCB = () => {}) {
    animate(this, {
      duration,
      easing,
      props: {x, y},
      onComplete: endCB
    });
  }

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
