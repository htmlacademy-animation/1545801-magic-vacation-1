export default class {
  constructor(options) {
    const {
      node,
      from,
      to,
      duration,
      fps = 60,
      delay = 0,
      begin = () => {},
      update = () => {},
      complete = () => {},
    } = options;

    this.node = node;
    this.fps = fps;
    this.from = from;
    this.to = to;
    this.value = this.from;
    this.duration = duration;
    this.complete = complete;
    this.update = update;
    this.delay = Math.abs(delay);
    this.begin = begin;
    this.step = 1000 / this.fps;
    this.resetTime = () => {
      this._resetTime.apply(this);
    };
  }

  updateNode() {
    this.node.innerHTML = this.value;
  }

  startTimer() {
    setTimeout(() => {
      this.isActive = true;
      this.prevTime = Date.now();
      this.begin();
      this.updateNode();
      this.update(this.value);
      this.currentTime = 0;
      document.addEventListener(`visibilitychange`, this.resetTime);
      requestAnimationFrame(() => this.updateTimer());
    }, this.delay);
  }

  updateTimer() {
    const currentTime = Date.now();

    if (!this.prevTime) {
      this.prevTime = currentTime;
    }

    if (currentTime - this.prevTime >= this.step) {
      let value;

      this.currentTime += currentTime - this.prevTime;

      if (this.currentTime >= this.duration) {
        this.currentTime = this.duration;
        this.stopTimer();
      }
      this.prevTime = currentTime;

      value = this.from + (this.to - this.from) * (this.currentTime / this.duration);
      this.value = Math.floor(value);
      this.updateNode();
      this.update(this.value);
    }

    if (this.isActive) {
      requestAnimationFrame(() => this.updateTimer());

    } else {
      this.complete(this.value);
    }
  }

  stopTimer() {
    document.removeEventListener(`visibilitychange`, this.resetTime);
    this.isActive = false;
  }

  _resetTime() {
    if (!document.hidden) {
      this.prevTime = undefined;
    }
  }
}
