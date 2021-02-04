import animate from '../canvas-lib/animate';
import CanvasLib from '../canvas-lib/canvas';
import Snowflake from './result-objects/snowflake';
import Ice from './result-objects/ice';

export default class extends CanvasLib {
  constructor(canvas) {
    super(canvas);
  }

  startAnimation() {
    const ice = this.canvasObjects.ice;

    this.addChild(ice);
    ice.show(this.canvas, 500);

    setTimeout(() => {
      this.showSnowflakes();
    }, 1000);
  }

  createObjects(images, canvas) {
    const leftSnowflake = new Snowflake(images.snowflake, {
      scaleX: 0.15,
      scaleY: 0.15,
      x: canvas.width * 0.3,
      y: canvas.height * 0.5,
    });
    const rightSnowflake = new Snowflake(images.snowflake, {
      flipX: true,
      scaleX: 0.1,
      scaleY: 0.1,
      x: canvas.width * 0.7,
      y: canvas.height * 0.52,
    });
    const ice = new Ice({
      ice: images.ice,
      seaCalf: images.seaCalf,
    });

    this.canvasObjects = {
      leftSnowflake,
      rightSnowflake,
      ice,
    };
  }

  showIce(endCB = () => {}) {
    const ice = this.canvasObjects.ice;
    const seaCalf = this.canvasObjects.seaCalf;
    const from = this.canvas.height + ice.getScaledHeight() * 0.6;
    const to = ice.y - ice.getScaledHeight() * 0.15;
    const onChange = () => this.updateSeaCalfPosition();

    this.addChild(ice, seaCalf);

    ice.angle = 10;
    ice.y = from;

    animate(ice, {
      duration: 500,
      onChange,
      props: {
        y: to,
      },
      easing: `easeOutSine`,
      onComplete: () => {
        this.bounceIce();
        endCB();
      },
    });
  }

  showSnowflakes() {
    const snowflakes = [
      this.canvasObjects.leftSnowflake,
      this.canvasObjects.rightSnowflake,
    ];
    this.addChild(snowflakes[0]);
    snowflakes[0].show(1000);
    snowflakes[0].ciclicMove(2000, 0.1);

    setTimeout(() => {
      this.addChild(snowflakes[1]);
      snowflakes[1].show(1000);
      snowflakes[1].ciclicMove(2500, -0.1);
    }, 200);
  }
}
