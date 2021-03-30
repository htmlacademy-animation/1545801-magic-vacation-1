import {degreesToRadians} from '../utils';
import DisplayObject from './display-object';

export default class extends DisplayObject {
  constructor(props) {
    super(props);

    this.width = props.width || 0;
    this.height = props.height || 0;


    this.graphics = [];
  }

  fill() {
    this.append((ctx) => {
      ctx.fill();
    });
  }

  fillStyle(color) {
    this.append((ctx) => {
      ctx.fillStyle = color;
    });
  }

  strokeStyle(color) {
    this.append((ctx) => {
      ctx.strokeStyle = color;
    });
  }

  stroke() {
    this.append((ctx) => {
      ctx.stroke();
    });
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    this.append((ctx) => {
      const oX = x + (-this.width * this.originX);
      const oY = y + (-this.height * this.originY);

      ctx.arc(oX, oY, radius, startAngle, endAngle, anticlockwise);
    });
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.append((ctx) => {
      const xOffset = (-this.width * this.originX);
      const yOffset = (-this.height * this.originY);
      const coords = {
        cp1x: cp1x + xOffset,
        cp1y: cp1y + yOffset,
        cp2x: cp2x + xOffset,
        cp2y: cp2y + yOffset,
        x: x + xOffset,
        y: y + yOffset,
      };

      ctx.bezierCurveTo(coords.cp1x, coords.cp1y, coords.cp2x, coords.cp2y, coords.x, coords.y);
    });
  }

  moveTo(x, y) {
    this.append((ctx) => {
      const oX = x + (-this.width * this.originX);
      const oY = y + (-this.height * this.originY);
      ctx.moveTo(oX, oY);
    });
  }

  lineTo(x, y) {
    this.append((ctx) => {
      const oX = x + (-this.width * this.originX);
      const oY = y + (-this.height * this.originY);

      ctx.lineTo(oX, oY);
    });
  }

  beginPath() {
    this.append((ctx) => {
      ctx.beginPath();
    });
  }

  strokeRect(x, y, width, height) {
    this.append((ctx) => {
      const oX = x + (-this.width * this.originX);
      const oY = y + (-this.height * this.originY);

      ctx.strokeRect(oX, oY, width, height);
    });
  }

  lineWidth(value) {
    this.append((ctx) => {
      ctx.lineWidth = value;
    });
  }

  append(action) {
    this.graphics.push(action);
  }

  clear() {
    this.graphics = [];
  }

  _render(ctx) {
    const elem = this;
    const graphics = this.graphics;
    const length = graphics.length;
    const parentProps = elem.getParentProps();
    let alpha = elem.alpha * parentProps.alpha;

    if (alpha < 0) {
      alpha = 0;
    } else if (alpha > 1) {
      alpha = 1;
    }

    if (this.visible && alpha > 0 && length > 0) {
      const scale = {};
      const skew = {};
      const position = {};
      const angle = {};

      position.x = elem.x * parentProps.scaleX + parentProps.x;
      position.y = elem.y * parentProps.scaleY + parentProps.y;
      scale.x = elem.scaleX * parentProps.scaleX;
      scale.y = elem.scaleY * parentProps.scaleY;
      angle.degrees = elem.angle + parentProps.angle;
      angle.radians = degreesToRadians(angle.degrees);
      skew.x = elem.skewX + parentProps.skewX;
      skew.y = elem.skewY + parentProps.skewY;

      if (elem.flipX) {
        scale.x = -scale.x;
      }

      if (elem.flipY) {
        scale.y = -scale.y;
      }

      ctx.save();

      ctx.globalAlpha = alpha;
      ctx.translate(position.x, position.y);
      ctx.rotate(angle.radians);
      ctx.scale(scale.x, scale.y);

      graphics.forEach((graph) => {
        graph(ctx);
      });

      ctx.restore();

      if (elem.mask) {
        ctx.globalCompositeOperation = `destination-in`;
        elem.mask.parent = elem.parent;
        elem.mask._render(ctx);
        ctx.globalCompositeOperation = `source-over`;
      }
    }
  }
}
