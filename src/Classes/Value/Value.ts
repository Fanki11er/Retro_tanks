import { VALUE_SHOW_DELAY, VALUE_SHOW_TIME } from "../../constants";
import { theme } from "../../GlobalStyles/theme";
import { Animation } from "../Animation/Animation";

export class Value extends Animation {
  private value: number;
  private xPos: number;
  private yPos: number;
  private showDelay = VALUE_SHOW_DELAY;
  private time = VALUE_SHOW_TIME;

  constructor(value: number, xPos: number, yPos: number) {
    super();
    this.value = value;
    this.xPos = xPos;
    this.yPos = yPos;
  }
  showValue(ctx: CanvasRenderingContext2D, deltaTime: number) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "white";
    ctx.font = ` 12px ${theme.fonts.main}`;
    if (this.counter > this.showDelay) {
      ctx.fillText(`${this.value}`, this.xPos, this.yPos);
    }
    if (this.counter > this.time + this.showDelay) {
      this.animationEnded = true;
    }
    this.counter += deltaTime;
  }
}
