import animate from '../../canvas-lib/animate';
import CanvasImage from '../../canvas-lib/displayObjects/image';
import CanvasGroup from '../../canvas-lib/displayObjects/group';

export default class extends CanvasGroup {
  constructor(image, props) {
    const drop = new CanvasImage(image);

    super([drop], props);

    this.activeObjects = {
      drop,
    };
  }

  scaleAnimation(value, duration, endCB = () => {}) {
    const {drop} = this.activeObjects;

    animate(drop, {
      duration,
      props: {
        scaleX: value,
        scaleY: value,
      },
      onComplete: endCB,
    });
  }

  move(x, y, duration, easing, endCB = () => {}) {
    const {drop} = this.activeObjects;

    animate(drop, {
      duration,
      easing,
      props: {x, y},
      onComplete: endCB
    });
  }

  alphaAnimation(value, duration, endCB = () => {}) {
    const {drop} = this.activeObjects;

    animate(drop, {
      duration,
      props: {
        alpha: value,
      },
      onComplete: endCB,
    });
  }

  fallAnimation(endCB = () => {}) {
    const {drop} = this.activeObjects;

    drop.set({
      alpha: 1,
      x: 0,
      y: 0,
      scaleX: 0,
      scaleY: 0
    });

    this.move(0, drop.height * 0.6, 300, `easeInOutSine`);
    this.scaleAnimation(1, 300, () => {
      setTimeout(() => {
        this.move(0, drop.y + drop.height * 0.7, 400, `easeInSine`, () => {
          this.move(0, drop.y + drop.height * 0.35, 200, `easeOutSine`);
          this.alphaAnimation(0, 200);
          this.scaleAnimation(0.5, 200, endCB);
        });
      }, 100);
    });
  }
}
