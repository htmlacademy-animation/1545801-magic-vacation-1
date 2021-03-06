import CanvasLib from '../canvas-lib/canvas';
import Snowflake from './objects/snowflake';
import Ice from './objects/ice';
import Tree from './objects/tree';
import Airplane from './objects/airplane';
import Blob from './objects/blob';
import {
  degreesToRadians
} from '../canvas-lib/utils';

export default class extends CanvasLib {
  constructor(canvas) {
    super(canvas);
    this.setCanvasSize(1000, 1000);
    this.imageSources = {
      airplane: `./img/result1/airplane.png`,
      ice: `./img/result1/ice.png`,
      seaCalf: `./img/result1/sea-calf-2.png`,
      snowflake: `./img/result1/snowflake.png`,
      tree: `./img/result1/tree.png`,
    };
  }

  init(endCB = () => {}) {
    this.loadImages(this.imageSources, (images) => {
      this.createObjects(images, this.canvas);
      this.startAnimation();
      this.startRender();
      endCB();
    });
  }

  startAnimation() {
    const ice = this.canvasObjects.ice;
    const tree1 = this.canvasObjects.tree1;
    const tree2 = this.canvasObjects.tree2;
    const airplane = this.canvasObjects.airplane;
    const blob = this.canvasObjects.blob;

    this.addChild(blob, airplane, tree1, tree2, ice);
    ice.show(this.canvas, 500, () => {
      ice.bounce();
      this.showSnowflakes();
    });
    tree1.show(1000);
    blob.show(200);
    airplane.show(200);
    airplane.animate(this.canvas, () => {
      this.updateBlob();
    });
  }

  createObjects(images, canvas) {
    const lSnowflakeScale = canvas.height * 0.16 / images.snowflake.height;
    const leftSnowflake = new Snowflake(images.snowflake, {
      scaleX: lSnowflakeScale,
      scaleY: lSnowflakeScale,
      x: canvas.width * 0.3,
      y: canvas.height * 0.5,
    });
    const rSnowflakeScale = canvas.height * 0.14 / images.snowflake.height;
    const rightSnowflake = new Snowflake(images.snowflake, {
      flipX: true,
      scaleX: rSnowflakeScale,
      scaleY: rSnowflakeScale,
      x: canvas.width * 0.7,
      y: canvas.height * 0.52,
    });
    const iceHeight = canvas.height * 1.5;
    const ice = new Ice({
      ice: images.ice,
      seaCalf: images.seaCalf,
    });
    const t1Scale = canvas.height * 0.14 / images.tree.height;
    const tree1 = new Tree(images.tree, {
      scaleX: t1Scale,
      scaleY: t1Scale,
      alpha: 0.8,
      originY: 1,
      x: canvas.width * 0.58,
      y: canvas.height * 0.55,
    });
    const t2Scale = canvas.height * 0.13 / images.tree.height;
    const t2x = tree1.x + tree1.getScaledWidth() * 0.9;
    const tree2 = new Tree(images.tree, {
      originY: 1,
      scaleX: t2Scale,
      scaleY: t2Scale * 0.65,
      x: t2x,
      y: tree1.y,
    });
    const airplaneScale = canvas.height * 0.065 / images.airplane.height;
    const airplane = new Airplane(images.airplane, {
      scaleX: airplaneScale,
      scaleY: airplaneScale,
      x: canvas.width * 0.55,
      y: canvas.height * 0.38,
    });
    const blob = new Blob({
      x: airplane.x - canvas.width * 0.1,
      y: airplane.y - airplane.getScaledHeight() * 0.4,
    });

    ice.scaleToHeight(iceHeight);

    this.canvasObjects = {
      leftSnowflake,
      rightSnowflake,
      ice,
      tree1,
      tree2,
      airplane,
      blob
    };
  }

  updateBlob() {
    const {
      blob,
      airplane
    } = this.canvasObjects;
    const degrees = airplane.angle + 135;
    const radians = degreesToRadians(degrees);
    const posRadius = airplane.width * airplane.scaleX * 0.5;
    const pos = {
      x: airplane.x - blob.x + posRadius * Math.cos(radians),
      y: airplane.y - blob.y + posRadius * Math.sin(radians),
    };
    const arcRadius = pos.x * 0.35;

    blob.clear();
    blob.fillStyle(`#acc3ff`);
    blob.beginPath();
    blob.arc(0, arcRadius, arcRadius, Math.PI / 2, Math.PI * 3 / 2);
    blob.moveTo(0, 0);
    blob.bezierCurveTo(
        pos.x * 0.31,
        arcRadius * -0.1,
        pos.x * 0.6,
        arcRadius * 1,
        pos.x,
        pos.y
    );
    blob.bezierCurveTo(
        pos.x * 0.7,
        arcRadius * 2,
        pos.x * 0.1,
        arcRadius * 2,
        0,
        arcRadius * 2
    );
    blob.lineTo(0, 0);
    blob.fill();
  }

  showSnowflakes() {
    const snowflakes = [
      this.canvasObjects.leftSnowflake,
      this.canvasObjects.rightSnowflake,
    ];
    this.addChild(snowflakes[0]);
    snowflakes[0].show(500);
    snowflakes[0].ciclicMove(2000, 0.15);

    setTimeout(() => {
      this.addChild(snowflakes[1]);
      snowflakes[1].show(500);
      snowflakes[1].ciclicMove(2500, -0.15);
    }, 200);
  }
}
