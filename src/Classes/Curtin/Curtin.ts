export class Curtin {
  counter = 0;
  animationEnded = false;
  offset = 0;
  width;
  height;
  isClosed = true;
  isBlocked = true;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drawCurtin(canvasCtx: CanvasRenderingContext2D, delay: number, stage: number) {
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, this.width, this.height);
      canvasCtx.fillStyle = 'rgba(127, 127, 127, 1)';
      canvasCtx.fillRect(0, 0, this.width, this.height / 2 - this.offset);
      canvasCtx.fillRect(0, this.height / 2 + this.offset, this.width, this.height / 2 - this.offset);

      if (!this.isBlocked && this.isClosed) {
        this.openCurtin(delay);
      }
      if (!this.isBlocked && !this.isClosed) {
        this.closeCurtin(delay);
      }
      if (this.isClosed && this.isBlocked) {
        this.drawStageText(canvasCtx, stage);
      }
    }
  }

  private openCurtin(delay: number) {
    this.counter += 1;
    if (this.counter % delay === 0) {
      this.offset += 2;
    }
    if (this.offset >= this.height / 2) {
      this.isBlocked = true;
      this.isClosed = false;
    }
  }

  private closeCurtin(delay: number) {
    this.counter += 1;
    if (this.counter % delay === 0) {
      this.offset -= 2;
    }
    if (this.offset <= this.height / 2) {
      this.isBlocked = true;
      this.isClosed = true;
    }
  }

  private drawStageText(canvasCtx: CanvasRenderingContext2D, stage: number) {
    const stageInfoText = `Stage ${stage}`;
    const fontSize = 20;
    canvasCtx.globalCompositeOperation = 'overlay';
    canvasCtx.fillStyle = 'black';
    canvasCtx.font = `bold ${fontSize}px Arial`;
    const textMetrics = canvasCtx.measureText(stageInfoText);
    canvasCtx.fillText(stageInfoText, this.width / 2 - textMetrics.width / 2, this.height / 2 + fontSize / 2, 100);
  }
}

