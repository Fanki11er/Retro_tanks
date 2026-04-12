import { Animation } from "../Animation/Animation";

export class ExplosionAnimationFrames extends Animation {
  private animationFrames: HTMLImageElement[];
  private textureSize: number;
  public delay: number;
  public xPos: number;
  public yPos: number;

  constructor(
    animationFrames: HTMLImageElement[],
    textureSize: number,
    delay: number,
    xPos: number,
    yPos: number,
  ) {
    super();
    this.animationFrames = animationFrames;
    this.textureSize = textureSize;
    this.delay = delay;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  animateFrames(ctx: CanvasRenderingContext2D, deltaTime: number) {
    const image = this.animationFrames[this.index];
    if (this.index < this.animationFrames.length) {
      ctx!.globalCompositeOperation = "source-over";
      ctx.drawImage(
        image,
        this.xPos,
        this.yPos,
        this.textureSize,
        this.textureSize,
      );
    } else {
      this.animationEnded = true;
    }
    this.counter += deltaTime;
    if (this.counter >= this.delay) {
      this.counter = 0;
      this.index += 1;
    }
  }
}
