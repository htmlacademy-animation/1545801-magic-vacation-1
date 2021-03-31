import animate from '../../canvas-lib/animate';
import CanvasImage from '../../canvas-lib/displayObjects/image';
import CanvasGroup from '../../canvas-lib/displayObjects/group';

export default class extends CanvasGroup {
  constructor(images, props) {
    const ice = new CanvasImage(images.ice, {
      originX: 0.45,
    });
    const seaCalfScale = (ice.getScaledHeight() * 2.5) / images.seaCalf.height;
    const seaCalf = new CanvasImage(images.seaCalf, {
      originX: 0.52,
      originY: 0.65,
      scaleX: seaCalfScale,
      scaleY: seaCalfScale,
    });

    super([ice, seaCalf], props);
  }

  show(canvas, duration, endCB = () => {}) {
    const from = canvas.height + this.getScaledHeight() * 0.6;
    const to = canvas.height * 0.5 + this.getScaledHeight() * 0.05;

    this.set({
      angle: 10,
      x: canvas.width * 0.5,
      y: from,
    });

    animate(this, {
      duration,
      props: {
        y: to,
      },
      easing: `easeOutSine`,
      onComplete: endCB,
    });
  }

  bounce() {
    animate(this, {
      duration: 2000,
      onChange: (progress) => {
        const progressReversed = 1 - this.bounceEase(progress);

        this.y = this.y + 10 * progressReversed;
        this.angle = 10 * Math.sin(progressReversed);
      },
      easing: `easeOutElastic`
    });
  }

  bounceEase(x) {
    const c4 = (2 * Math.PI) / 3;

    if (x === 0) {
      return 0;
    } else if (x === 1) {
      return 1;
    } else {
      return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }
  }

  rotate(angle, duration, easing, endCB = () => {}) {
    animate(this, {
      props: {
        angle,
      },
      duration,
      easing,
      onComplete: endCB,
    });
  }

  moveY(y, duration, easing, endCB = () => {}) {
    animate(this, {
      props: {
        y,
      },
      duration,
      easing,
      onComplete: endCB,
    });
  }
}
