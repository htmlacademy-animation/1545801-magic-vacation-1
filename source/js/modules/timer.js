export default class Timer {
  constructor(duration, update, complete) {
    this.duration = duration;
    this.update = update;
    this.complete = complete;
  }

  startTimer() {
    if (!this.startTime) {
      this.startTime = Date.now();
    }
    this.isTimerActive = true;
    requestAnimationFrame(() => this.updateTimer());
  }

  stopTimer() {
    this.isTimerActive = false;
  }

  restartTimer() {
    this.startTime = Date.now();
    this.startTimer();
  }

  updateTimer() {
    if (this.isTimerActive) {
      this.currentTime = Date.now();
      this.timeLeft = this.duration - (this.currentTime - this.startTime);

      if (this.timeLeft > 0) {
        requestAnimationFrame(() => this.updateTimer());

      } else {
        this.timeLeft = 0;

        if (this.complete) {
          this.complete(this.timeLeft);
        }
      }

      if (this.update) {
        this.update(this.timeLeft, this.currentTime, this.startTime);
      }
    }

  }
}
