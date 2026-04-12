export class Timer {
  private counter: number = 0;
  private isCounting: boolean = false;
  private delay!: number;
  private timeUpCallback?: () => void;
  private repeat: boolean = false;

  start(callback: () => void, delay: number, repeat: boolean = false) {
    this.reset();
    this.isCounting = true;
    this.delay = delay;
    this.timeUpCallback = callback;
    this.repeat = repeat;
  }

  getCurrentTime() {
    return this.counter;
  }

  stop() {
    this.isCounting = false;
    this.counter = 0;
  }
  reset() {
    this.counter = 0;
  }

  update(deltaTime: number) {
    if (this.isCounting) {
      this.counter += deltaTime;
      if (this.counter >= this.delay) {
        if (!this.repeat) {
          this.stop();
        } else {
          this.reset();
          this.counter = 0;
        }

        if (this.timeUpCallback) {
          this.timeUpCallback();
        }
      }
    }
  }
}
