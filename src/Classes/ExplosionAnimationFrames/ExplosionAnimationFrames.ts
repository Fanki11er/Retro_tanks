import { Animation } from '../Animation/Animation';

export class ExplosionAnimationFrames extends Animation {
  xPos;
  yPos;
  delay;

  constructor(animationFrames: HTMLImageElement[], textureSize: number, delay: number, xPos: number, yPos: number) {
    super(animationFrames, textureSize);
    this.xPos = xPos;
    this.yPos = yPos;
    this.delay = delay;
  }

  animateFrames(ctx: CanvasRenderingContext2D) {
    let image = this.animationsFrames[this.index];
    if (this.index < this.animationsFrames.length) {
      ctx!.globalCompositeOperation = 'source-over';
      ctx.drawImage(image, this.xPos, this.yPos, this.textureSize, this.textureSize);
    } else {
      this.animationEnded = true;
    }
    this.counter += 1;
    if (this.counter % this.delay === 0) {
      this.counter = 0;
      this.index += 1;
    }
  }
}

