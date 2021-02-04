import CanvasObject from './display-object';

export default class extends CanvasObject {
  constructor(children, props) {
    const size = {
      width: 0,
      height: 0,
    };

    super(props);
    this.children = [];

    if (children.length > 0) {
      this.addChild(...children);
    }

    children.forEach((child) => {
      if (child.width > size.width) {
        size.width = child.width;
      }

      if (child.height > size.height) {
        size.height = child.height;
      }
    });
    this.width = size.width;
    this.height = size.height;
  }

  addChild(...objects) {
    this.children.push(...objects);
    objects.forEach((obj) => {
      obj.parent = this;
    });
  }

  removeChild(object) {
    const index = this.children.indexOf(object);

    if (index > -1) {
      this.children.splice(index, 1);
      object.parent = undefined;
    }
  }
}
