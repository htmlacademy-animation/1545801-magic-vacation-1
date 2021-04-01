import {degreesToRadians} from '../utils';
import CanvasObject from './display-object';

export default class extends CanvasObject {
  constructor(image, props) {
    super(props);
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  _render(ctx) {
    const elem = this;

    if (elem.alpha < 0) {
      elem.alpha = 0;
    } else if (elem.alpha > 1) {
      elem.alpha = 1;
    }

    if (elem.visible && elem.alpha > 0) {
      const parentProps = elem.getParentProps();
      const alpha = elem.alpha * parentProps.alpha;
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

      ctx.drawImage(
          elem.image,
          -elem.width * elem.originX,
          -elem.height * elem. originY
      );

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
