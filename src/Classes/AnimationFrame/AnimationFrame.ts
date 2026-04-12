import { Animation } from "../Animation/Animation";

export class AnimationFrames extends Animation {
  public animationFrames: HTMLImageElement[];
  public textureSize: number;
  constructor(animationFrames: HTMLImageElement[], textureSize: number) {
    super();
    this.animationFrames = animationFrames;
    this.textureSize = textureSize;
  }

  animateFrames(
    deltaTime: number,
    delay: number,
    ctx: CanvasRenderingContext2D,
    xPos: number,
    yPos: number,
    termOfStop: boolean,
    /*repeats: number*/
  ) {
    const image = this.animationFrames[this.index];
    if (termOfStop || this.repeats > 0) {
      ctx.drawImage(image, xPos, yPos, this.textureSize, this.textureSize);
    } else {
      this.animationEnded = true;
    }
    this.counter += deltaTime;
    if (this.counter >= delay) {
      this.counter = 0;
      this.index += 1;
      if (this.index === this.animationFrames.length) {
        this.index = 0;
        this.repeats -= 1;
      }
    }
  }
}
