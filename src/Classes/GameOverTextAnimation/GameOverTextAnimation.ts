import { theme } from "../../GlobalStyles/theme";

const { red } = theme.colors;

export class GameOverTextAnimation {
  counter = 0;
  animationEnded = false;
  xPos;
  yPos;
  secondYPos;
  offset = 0;
  constructor(xPos: number, yPos: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.secondYPos = yPos + 16;
  }

  animate(canvasCtx: CanvasRenderingContext2D, delay: number) {
    if (canvasCtx) {
      canvasCtx.fillStyle = red;
      canvasCtx.globalCompositeOperation = "overlay";
      canvasCtx.fillText("GAME", this.xPos, this.yPos - this.offset, 50);
      canvasCtx.fillText("OVER", this.xPos, this.secondYPos - this.offset, 50);
      this.counter++;
      if (this.counter % delay === 0 && !this.animationEnded) {
        this.offset += 1;
      }
      if (this.yPos - this.offset <= 150) {
        this.animationEnded = true;
      }
    }
    return this.animationEnded;
  }

  reset() {
    this.counter = 0;
    this.animationEnded = false;
    this.offset = 0;
  }
}
