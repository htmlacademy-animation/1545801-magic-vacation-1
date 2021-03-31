import animate from '../../canvas-lib/animate';
import CanvasImage from '../../canvas-lib/displayObjects/image';
import CanvasGroup from '../../canvas-lib/displayObjects/group';

export default class extends CanvasGroup {
  constructor(images, props) {
    const ice = new CanvasImage(images.ice, {
      originX: 0.45,
      // x: this.canvas.width * 0.5 - ice.getScaledWidth() * (0.5 - ice.originX),
      // y: this.canvas.height * 0.6,
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
    // const children = this.children;
    // const defY = this.y;

    // console.log(1 - this.bounceEase(0));
    // this.angle = 10 * Math.sin(1 - this.bounceEase(0));

    animate(this, {
      duration: 2000,
      onChange: (progress) => {
        // const progressReversed = 1 - progress;
        const progressReversed = 1 - this.bounceEase(progress);

        this.y = this.y + 10 * progressReversed;
        this.angle = 10 * Math.sin(progressReversed);

        // children.forEach((child) => {
        //   child.y = 30 * progressReversed;
        //   // child.angle = -30 * Math.sin(progressReversed * 2);
        // });
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

  // bounce() {
  //   const ice = this;
  //   let offset = ice.getScaledHeight() * 0.03;
  //   const defaultY = ice.y + offset;
  //   const sAngle = ice.angle;
  //   let angle = 5;
  //   const duration = 500;
  //   const easing = `easeInOutQuad`;
  //   const update = () => {
  //     angleTime -= 0.07;
  //     yTime -= 0.07;

  //     console.log(angleTime, Math.sin(angleTime));

  //     ice.y = defaultY - offset * Math.sin(yTime);
  //     ice.angle = angle * Math.sin(angleTime);

  //     console.log(offset);


  //     if (!stopAnimate) {
  //       requestAnimationFrame(update);
  //     }
  //   };

  //   let yTime = -0.02;
  //   let angleTime = 1.2;

  //   let stopAnimate = false;

  //   setInterval(() => {
  //     angle -= 1;

  //     if (angle <= 0) {
  //       stopAnimate = true;
  //     }
  //   }, 2000);

  //   // setTimeout(() => {
  //   //   stopAnimate = true;
  //   // }, 2000);

  //   // update();

  //   let size = 1;
  //   let ang = 5;

  //   let move = () => {
  //     this.rotate(0, 500, `easeInQuad`);
  //     this.moveY(defaultY, 500, `easeInQuad`, () => {
  //       this.rotate(-ang * size, 500, `easeOutQuad`);
  //       this.moveY(defaultY + offset * size, 500, `easeOutQuad`, () => {
  //         this.rotate(0, 500, `easeInQuad`);
  //         this.moveY(defaultY, 500, `easeInQuad`, () => {
  //           this.rotate(ang * size, 500, `easeOutQuad`);
  //           this.moveY(defaultY - offset * size, 500, `easeOutQuad`, () => {
  //             size -= 0.2;

  //             if (size > 0.1) {
  //               move();
  //             }
  //           });
  //         });
  //       });
  //     });
  //   };
  //   move();
  // }

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
