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
    const seaCalf = new CanvasImage(images.seaCalf, {
      originX: 0.52,
      originY: 0.65,
      scaleX: 0.3,
      scaleY: 0.3,
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
    const ice = this.canvasObjects.ice;
    let offset = ice.getScaledHeight() * 0.1;
    const defaultY = ice.y + offset;
    const sAngle = ice.angle;
    let angle = 5;
    const duration = 500;
    const easing = `easeInOutQuad`;
    const onChange = () => this.updateSeaCalfPosition();
    const update = () => {
      angleTime -= 0.07;
      yTime -= 0.07;

      console.log(angleTime, Math.sin(angleTime));

      ice.y = defaultY - offset * Math.sin(yTime);
      ice.angle = angle * Math.sin(angleTime);

      console.log(offset);

      onChange();

      if (!stopAnimate) {
        requestAnimationFrame(update);
      }
    };

    let yTime = -0.02;
    let angleTime = 1.2;

    let stopAnimate = false;

    setInterval(() => {
      angle -= 1;

      if (angle <= 0) {
        stopAnimate = true;
      }
    }, 2000);

    // setTimeout(() => {
    //   stopAnimate = true;
    // }, 2000);

    // update();
  }
}
