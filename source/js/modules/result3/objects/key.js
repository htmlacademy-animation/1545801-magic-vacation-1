import animate from '../../canvas-lib/animate';
import CanvasImage from '../../canvas-lib/displayObjects/image';

export default class extends CanvasImage {
  show(duration, endCB = () => {}) {
    const to = this.scaleX;
    const from = this.scaleX * 0.8;

    this.set({
      alpha: 0,
      scaleX: from,
      scaleY: from
    });

    animate(this, {
      duration,
      props: {
        scaleX: to,
        scaleY: to,
        alpha: 1,
      },
      easing: `easeInSine`,
      onComplete: endCB
    });
  }
}
