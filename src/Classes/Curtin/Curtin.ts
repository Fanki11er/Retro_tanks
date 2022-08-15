export class Curtin {
  counter = 0;
  animationEnded = false;
  offset = 0;
  width;
  height;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drawCurtin(canvasCtx: CanvasRenderingContext2D, delay: number) {
    if (canvasCtx) {
      if (this.offset <= this.height / 2) {
        canvasCtx.clearRect(0, 0, this.width, this.height);
        canvasCtx.fillStyle = 'rgba(127, 127, 127, 1)';
        canvasCtx.fillRect(0, 0, this.width, this.height / 2 - this.offset);
        canvasCtx.fillRect(0, this.height / 2 + this.offset, this.width, this.height / 2 - this.offset);
        this.counter += 1;
        if (this.counter % delay === 0) {
          this.offset += 2;
        }
      }
    }
  }
}

