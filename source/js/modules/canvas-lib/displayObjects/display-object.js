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
}
