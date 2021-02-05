import CanvasImage from './displayObjects/image';
import CanvasGroup from './displayObjects/group';

export default class {
  constructor(canvas) {
    this.images = {};
    this.canvasObjects = {};
    this.canvas = canvas;
    this.children = [];

    this.Image = CanvasImage;
    this.Group = CanvasGroup;
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
    const update = (children) => {
      if (children.length > 0) {
        const parentProps = getParentProps(children[0]);

        children.forEach((child) => {
          if (child.visible) {
            const alpha = child.alpha * parentProps.alpha;
            const scale = {};
            const skew = {};
            const position = {};
            const angle = {};

            position.x = child.x * parentProps.scaleX + parentProps.x;
            position.y = child.y * parentProps.scaleY + parentProps.y;
            scale.x = child.scaleX * parentProps.scaleX;
            scale.y = child.scaleY * parentProps.scaleY;
            angle.degrees = child.angle + parentProps.angle;
            angle.radians = degreesToRadians(angle.degrees);
            skew.x = child.skewX + parentProps.skewX;
            skew.y = child.skewY + parentProps.skewY;

            if (child.flipX) {
              scale.x = -scale.x;
            }

            if (child.flipY) {
              scale.y = -scale.y;
            }
            if (child.children) {
              update(child.children);

            } else {
              ctx.save();
              ctx.resetTransform();

              ctx.globalAlpha = alpha;
              // ctx.translate(position.x, position.y);
              // ctx.rotate(angle.radians);
              // ctx.scale(scale.x, scale.y);
              ctx.setTransform(
                  scale.x,
                  Math.tan(angle.radians + degreesToRadians(skew.x)) * scale.x,
                  -Math.tan(angle.radians + degreesToRadians(skew.y)) * scale.y,
                  scale.y,
                  position.x,
                  position.y
              );

              ctx.drawImage(
                  child.image,
                  -child.width * child.originX,
                  -child.height * child. originY
              );

              ctx.restore();
            }
          }
        });

      }
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(this.children);
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

function getParentProps(child) {
  const props = {
    angle: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 1,
    skewY: 1,
    x: 0,
    y: 0,
    alpha: 1,
  };
  let parent = child.parent;

  while (parent) {
    props.angle += parent.angle;
    props.alpha *= parent.alpha;
    props.x = parent.x * (parent.parent ? parent.parent.scaleX : 1);
    props.y = parent.y * (parent.parent ? parent.parent.scaleY : 1);
    props.scaleX *= parent.scaleX;
    props.scaleY *= parent.scaleY;
    props.skewX += parent.skewX;
    props.skewY += parent.skewY;

    if (parent.flipX) {
      props.scaleX = -props.scaleX;
    }

    if (parent.flipY) {
      props.scaleY = -props.scaleY;
    }

    parent = parent.parent;
  }

  return props;
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
