import { Animation } from "../Animation/Animation";

export class Value extends Animation {
  private value: number;
  private xPos: number;
  private yPos: number;
  private showDelay: number;
  private time: number;

  constructor(
    value: number,
    xPos: number,
    yPos: number,
    showDelay: number,
    time: number
  ) {
    super();
    this.value = value;
    this.xPos = xPos;
    this.yPos = yPos;
    this.showDelay = showDelay;
    this.time = time;
  }
  showValue(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "white";
    ctx.font = " 12px Arial";
    if (this.counter > this.showDelay * 60) {
      ctx.fillText(`${this.value}`, this.xPos, this.yPos);
    }
    if (this.counter > (this.time + this.showDelay) * 60) {
      this.animationEnded = true;
    }
    this.counter++;
  }
}
