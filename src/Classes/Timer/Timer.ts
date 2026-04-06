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

  stop() {
    this.isCounting = false;
  }
  reset() {
    this.counter = 0;
  }

  update() {
    if (this.isCounting && this.delay) {
      this.counter++;
      if (this.counter % this.delay === 0) {
        if (!this.repeat) {
          this.stop();
        }
        //this.reset();
        if (this.timeUpCallback) {
          this.timeUpCallback();
        }
      }
    }
  }
}
