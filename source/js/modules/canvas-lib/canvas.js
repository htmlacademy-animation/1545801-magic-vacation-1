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

  clear() {
    const canvas = this.canvas;
    const ctx = canvas.getContext(`2d`);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  update() {
    const canvas = this.canvas;
    const ctx = canvas.getContext(`2d`);
    const children = this.children;
    const childrenLength = children.length;

    this.clear();

    if (childrenLength > 0) {
      children.forEach((child) => {
        child._render(ctx);
      });
    }
  }

  startRender() {
    const render = () => {
      if (!this.isStoppedRender) {
        this.update();
        requestAnimationFrame(render);
      }
    };

    this.isStoppedRender = false;
    render();
  }

  stopRender() {
    this.isStoppedRender = true;
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
    const drp = window.devicePixelRatio || 1;

    canvas.width = width * drp;
    canvas.height = height * drp;
    canvas.style.width = width + `px`;
    canvas.style.height = height + `px`;
  }

  setScaleCanvas(scale) {
    const canvas = this.canvas;

    canvas.scale = scale;
    canvas.style.transform = `scale(
      ${scale},
      ${scale}
    )`;
  }

  setCanvasToCenter() {
    const canvas = this.canvas;
    const parent = canvas.parentElement;
    const scale = canvas.scale;
    const left = (parent.offsetWidth * 0.5 - (canvas.width * scale) * 0.5);
    const top = (parent.offsetHeight * 0.5 - (canvas.height * scale) * 0.5);


    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;
  }

  enableResize() {
    const resizeFn = () => this.resizeOnFullScreen();

    this._resizeFn = resizeFn;

    window.addEventListener(`resize`, this._resizeFn);
  }

  disableResize() {
    const resizeFn = this._resizeFn;

    if (resizeFn) {
      window.removeEventListener(`resize`, resizeFn);
    }
  }

  resizeOnFullScreen() {
    const canvas = this.canvas;
    const maxSize = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
    const minSize = (maxSize === window.innerWidth ? window.innerHeight : window.innerWidth) * 1.5;
    const size = maxSize > minSize ? minSize : maxSize;
    const scale = size / canvas.offsetWidth;

    this.setScaleCanvas(scale);
  }
}
