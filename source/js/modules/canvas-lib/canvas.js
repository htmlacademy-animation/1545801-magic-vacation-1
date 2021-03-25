import CanvasImage from './displayObjects/image';
import CanvasGroup from './displayObjects/group';
import CanvasGraphics from './displayObjects/graphics';

export default class {
  constructor(canvas) {
    this.images = {};
    this.canvasObjects = {};
    this.canvas = canvas;
    this.children = [];

    this.Image = CanvasImage;
    this.Group = CanvasGroup;
    this.Graphics = CanvasGraphics;
  }

  addChild(...objects) {
    this.children.push(...objects);
  }

  removeChild(object) {
    const index = this.children.indexOf(object);

    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  update() {
    const ctx = this.canvas.getContext(`2d`);
    const canvas = this.canvas;
    const children = this.children;
    const childrenLength = children.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (childrenLength > 0) {
      children.forEach((child) => {
        child._render(ctx);
      });
    }
  }

  startRender() {
    const render = () => {
      if (!this.isStopperRender) {
        this.update();
        requestAnimationFrame(render);
      }
    };

    this.isStopperRender = false;
    render();
  }

  stopRender() {
    this.isStopperRender = true;
  }

  loadImages(sources, endCB = () => {}) {
    const names = Object.keys(sources);
    const maxCount = names.length;
    const loadHandler = () => {
      counter += 1;

      if (counter >= maxCount) {
        endCB(this.images);
      }
    };
    let counter = 0;
    let image;

    names.forEach((name) => {
      image = new Image();
      image.src = sources[name];
      this.images[name] = image;

      if (image.complete) {
        loadHandler();

      } else {
        image.addEventListener(`load`, loadHandler);
      }
    });
  }

  setCanvasSize(width, height) {
    const canvas = this.canvas;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + `px`;
    canvas.style.height = height + `px`;
  }

  setScaleCanvas(size) {
    const canvas = this.canvas;

    canvas.style.transform = `scale(
      ${size / canvas.width},
      ${size / canvas.height}
    )`;
  }

  setCanvasToCenter(width, height) {
    const canvas = this.canvas;
    const left = (width - canvas.offsetWidth) * 0.5;
    const top = (height - canvas.offsetHeight) * 0.5;

    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;
  }
}
