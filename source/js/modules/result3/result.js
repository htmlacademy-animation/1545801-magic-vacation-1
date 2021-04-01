import CanvasLib from '../canvas-lib/canvas';
import Crocodile from './objects/crocodile';
import Key from './objects/key';
import Item from './objects/item';
import Drop from './objects/drop';
import CrocodileMask from './objects/mask';

export default class extends CanvasLib {
  constructor(canvas) {
    super(canvas);
    this.setCanvasSize(1000, 1000);
    this.imageSources = {
      crocodile: `./img/result3/crocodile.png`,
      drop: `./img/result3/drop.png`,
      flamingo: `./img/result3/flamingo.png`,
      key: `./img/result3/key.png`,
      leaf: `./img/result3/leaf.png`,
      saturn: `./img/result3/saturn.png`,
      snowflake: `./img/result3/snowflake.png`,
      watermelon: `./img/result3/watermelon.png`,
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
    this.showKey(() => {
      this.canvasObjects.crocodile.mask = this.canvasObjects.crocodileMask;

      this.showCrocodile(() => {
        this.animateDrop();
      });
      this.animateItems();
    });
  }

  animateDrop() {
    const drop = this.canvasObjects.drop;
    const animate = () => {
      drop.fallAnimation(() => {
        setTimeout(animate, 500);
      });
    };

    this.addChild(drop);
    animate();
  }

  showCrocodile(endCB = () => {}) {
    const crocodile = this.canvasObjects.crocodile;
    const from = {
      x: crocodile.x + crocodile.getScaledWidth() * 1.2,
      y: crocodile.y - crocodile.getScaledHeight() * 0.7
    };
    const to = {
      x: crocodile.x,
      y: crocodile.y,
    };

    this.addChild(crocodile);
    crocodile.set(from);
    crocodile.move(to.x, to.y, 1000, `easeOutQuad`, endCB);
  }

  showKey(endCB = () => {}) {
    const key = this.canvasObjects.key;

    this.addChild(key);

    key.show(200, endCB);
  }

  animateItems() {
    this.showItems(() => {
      this.dropItems(() => {
        const objects = this.canvasObjects;
        const items = [
          objects.flamingo,
          objects.leaf,
          objects.saturn,
          objects.snowflake,
          objects.watermelon,
        ];

        items.forEach((item) => {
          this.removeChild(item);
        });
      });
    });
  }

  dropItems(endCB = () => {}) {
    const objects = this.canvasObjects;
    const canvas = this.canvas;
    const items = [
      objects.flamingo,
      objects.leaf,
      objects.saturn,
      objects.snowflake,
      objects.watermelon,
    ];
    const itemsLength = items.length;
    let counter = 0;

    items.forEach((item, index) => {
      setTimeout(() => {
        const y = item.y + canvas.height;

        item.move(item.x, y, 800, `easeInSine`, () => {
          counter += 1;

          if (counter >= itemsLength) {
            endCB();
          }
        });
      }, 20 * index);
    });
  }

  showItems(endCB = () => {}) {
    const objects = this.canvasObjects;
    const canvas = this.canvas;
    const items = [
      objects.flamingo,
      objects.leaf,
      objects.saturn,
      objects.snowflake,
      objects.watermelon,
    ];
    const itemsLength = items.length;
    let counter = 0;

    this.addChild(...items);

    items.forEach((item) => {
      const from = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
        angle: item.x < canvas.width * 0.5 ? 10 : -10,
        scaleX: 0,
        scaleY: 0,
      };
      const to = {
        x: item.x,
        y: item.y,
        angle: 0,
        scale: item.scaleX
      };

      item.set(from);
      item.scaleAnimation(to.scale, 500);
      item.rotateAnimation(to.angle, 500);
      item.move(to.x, to.y, 500, `easeOutQuad`, () => {
        counter += 1;

        if (counter >= itemsLength) {
          endCB();
        }
      });
    });
  }

  createObjects(images, canvas) {
    const key = this.createKey(images.key, canvas);
    const crocodile = this.createCrocodile(images.crocodile, key);
    const crocodileMask = new CrocodileMask(key);
    const drop = this.createDrop(images.drop, crocodile);
    const flamingo = this.createFlamingo(images.flamingo, canvas);
    const leaf = this.createLeaf(images.leaf, canvas);
    const saturn = this.createSaturn(images.saturn, canvas);
    const snowflake = this.createSnowflake(images.snowflake, canvas);
    const watermelon = this.createWatermelon(images.watermelon, canvas);

    this.canvasObjects = {
      crocodile,
      drop,
      key,
      flamingo,
      leaf,
      saturn,
      snowflake,
      watermelon,
      crocodileMask,
    };
  }

  createDrop(image, crocodile) {
    const scale = (crocodile.getScaledHeight() * 0.3) / image.height;
    const drop = new Drop(image, {
      scaleX: scale,
      scaleY: scale,
      x: crocodile.x - crocodile.getScaledWidth() * 0.09,
      y: crocodile.y - crocodile.getScaledHeight() * 0.17,
    });

    return drop;
  }

  createLeaf(image, canvas) {
    const scale = (canvas.height * 0.13) / image.height;
    const props = {
      x: canvas.width * 0.77,
      y: canvas.height * 0.4,
      scaleX: scale,
      scaleY: scale,
    };

    return new Item(image, props);
  }

  createFlamingo(image, canvas) {
    const scale = (canvas.height * 0.12) / image.height;
    const props = {
      x: canvas.width * 0.32,
      y: canvas.height * 0.45,
      scaleX: scale,
      scaleY: scale,
    };

    return new Item(image, props);
  }

  createSaturn(image, canvas) {
    const scale = (canvas.height * 0.085) / image.height;
    const props = {
      x: canvas.width * 0.74,
      y: canvas.height * 0.65,
      scaleX: scale,
      scaleY: scale,
    };

    return new Item(image, props);
  }

  createSnowflake(image, canvas) {
    const scale = (canvas.height * 0.09) / image.height;
    const props = {
      x: canvas.width * 0.65,
      y: canvas.height * 0.52,
      scaleX: scale,
      scaleY: scale,
    };

    return new Item(image, props);
  }

  createWatermelon(image, canvas) {
    const scale = (canvas.height * 0.08) / image.height;
    const props = {
      x: canvas.width * 0.25,
      y: canvas.height * 0.6,
      scaleX: scale,
      scaleY: scale,
    };

    return new Item(image, props);
  }

  createCrocodile(image, key) {
    const scale = (key.getScaledHeight() * 0.6) / image.height;
    const props = {
      x: key.x + key.getScaledWidth() * 0.1,
      y: key.y + key.getScaledHeight() * 0.3,
      scaleX: scale,
      scaleY: scale,
    };
    return new Crocodile(image, props);
  }

  createKey(image, canvas) {
    const scale = (canvas.height * 0.35) / image.height;
    const props = {
      x: canvas.width * 0.5,
      y: canvas.height * 0.5,
      scaleX: scale,
      scaleY: scale,
    };

    return new Key(image, props);
  }
}
