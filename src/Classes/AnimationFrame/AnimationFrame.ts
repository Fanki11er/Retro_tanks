export class AnimationFrames {
  private index = 0;
  private counter = 0;
  private repeats = 1;
  textureSize;
  animationsFrames: HTMLImageElement[];
  animationEnded = false;
  constructor(animationFrames: HTMLImageElement[], textureSize: number) {
    this.animationsFrames = animationFrames;
    this.textureSize = textureSize;
  }

  animateFrames(delay: number, ctx: CanvasRenderingContext2D, xPos: number, yPos: number, termOfStop: boolean, repeats: number) {
    let image = this.animationsFrames[this.index];
    if (termOfStop || this.repeats > 0) {
      ctx.drawImage(image, xPos, yPos, this.textureSize, this.textureSize);
    } else {
      this.animationEnded = true;
    }
    this.counter += 1;
    if (this.counter % delay === 0) {
      this.counter = 0;
      this.index += 1;
      if (this.index === this.animationsFrames.length) {
        this.index = 0;
        this.repeats -= 1;
      }
    }
  }
}

