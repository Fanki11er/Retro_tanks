import { Animation } from '../Animation/Animation';

export class ExplosionAnimationFrames extends Animation {
  constructor(
    private animationFrames: HTMLImageElement[],
    private textureSize: number,
    public delay: number,
    public xPos: number,
    public yPos: number,
  ) {
    super();
  }

  animateFrames(ctx: CanvasRenderingContext2D) {
    let image = this.animationFrames[this.index];
    if (this.index < this.animationFrames.length) {
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

