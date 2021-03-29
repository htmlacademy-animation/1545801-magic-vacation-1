export default class {
  constructor(props) {
    this.alpha = 1;
    this.x = 0;
    this.y = 0;
    this.originX = 0.5;
    this.originY = 0.5;
    this.flipX = false;
    this.flipY = false;
    this.scaleX = 1;
    this.scaleY = 1;
    this.skewX = 1;
    this.skewY = 1;
    this.angle = 0;
    this.visible = true;
    this.set(props);
  }

  set(props) {
    if (typeof props === `object`) {
      const names = Object.keys(props);

      names.forEach((name) => {
        this[name] = props[name];
      });
    }
  }

  scaleToWidth(value) {
    this._scaleTo(`width`, value);
  }

  scaleToHeight(value) {
    this._scaleTo(`height`, value);
  }

  _scaleTo(side, value) {
    const size = this[side];
    const scale = value / size;

    this.scaleX = scale;
    this.scaleY = scale;
  }

  getScaledWidth() {
    return this.width * this.scaleX;
  }

  getScaledHeight() {
    return this.height * this.scaleY;
  }

  _render() {}

  getParentProps() {
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
    let parent = this.parent;

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
}
