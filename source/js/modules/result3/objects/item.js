import animate from '../../canvas-lib/animate';
import CanvasImage from '../../canvas-lib/displayObjects/image';

export default class extends CanvasImage {
  move(x, y, duration, easing, endCB = () => {}) {
    animate(this, {
      duration,
      easing,
      props: {x, y},
      onComplete: endCB,
    });
  }

  scaleAnimation(value, duration, endCB = () => {}) {
    animate(this, {
      duration,
      props: {
        scaleX: value,
        scaleY: value,
      },
      easing: `easeOutQuad`,
      onComplete: endCB,
    });
  }

  rotateAnimation(value, duration, endCB = () => {}) {
    animate(this, {
      duration,
      props: {
        angle: value
      },
      easing: `easeOutQuad`,
      onComplete: endCB,
    });
  }
}
