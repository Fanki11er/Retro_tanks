import { CURTIN_ANIMATION_SPEED } from "../../constants";
import { theme } from "../../GlobalStyles/theme";

export class Curtin {
  private counter = 0;
  private animationEnded = false;
  private size = 0;
  private isClosed = true;
  private isBlocked = true;
  private animationSpeed = CURTIN_ANIMATION_SPEED;
  public width: number;
  public height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drawCurtin(
    canvasCtx: CanvasRenderingContext2D,
    stage: number,
    deltaTime: number,
  ) {
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, this.width, this.height);
      canvasCtx.fillStyle = theme.colors.darkerGray;
      canvasCtx.fillRect(0, 0, this.width, this.height);

      this.drawStageText(canvasCtx, stage);
      canvasCtx.fillStyle = "rgba(0, 0, 0, 1)";
      canvasCtx.fillRect(
        0,
        this.height / 2 - this.size / 2,
        this.width,
        this.size,
      );

      if (!this.isBlocked && this.isClosed) {
        this.openCurtin(this.animationSpeed, deltaTime);
      }
    }
    return this.animationEnded;
  }

  unlockCurtin() {
    this.isBlocked = false;
  }

  private openCurtin(animationSpeed: number, deltaTime: number) {
    this.counter += deltaTime;
    if (this.counter >= animationSpeed) {
      this.size += 3;
    }

    if (this.size >= this.height) {
      this.isBlocked = true;
      this.isClosed = false;
      this.animationEnded = true;
    }
  }

  private drawStageText(canvasCtx: CanvasRenderingContext2D, stage: number) {
    const stageInfoText = `Stage ${stage}`;
    const fontSize = 20;
    canvasCtx.globalCompositeOperation = "overlay";
    canvasCtx.fillStyle = "black";
    canvasCtx.font = `bold ${fontSize}px Arial`;
    const textMetrics = canvasCtx.measureText(stageInfoText);
    canvasCtx.fillText(
      stageInfoText,
      this.width / 2 - textMetrics.width / 2,
      this.height / 2 + fontSize / 2,
      100,
    );
  }

  reset() {
    this.counter = 0;
    this.animationEnded = false;
    this.size = 0;
    this.isClosed = true;
    this.isBlocked = true;
  }
}
