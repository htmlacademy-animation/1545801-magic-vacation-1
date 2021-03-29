import animate from '../../canvas-lib/animate';
import CanvasImage from '../../canvas-lib/displayObjects/image';

export default class extends CanvasImage {
  constructor(image, props) {
    super(image, props);
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

  ciclicMove(duration, offsetRatio) {
    const offset = this.getScaledHeight() * offsetRatio;
    const values = [
      this.y,
      this.y + offset,
    ];
    const move = () => {
      const y = values[step];

      step += 1;
      if (step >= values.length) {
        step = 0;
      }

      animate(this, {
        duration,
        props: {y},
        easing: `easeInOutQuad`,
        onComplete: move,
      });
    };
    let step = 1;

    move();
  }
}
