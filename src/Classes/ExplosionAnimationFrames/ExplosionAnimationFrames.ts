export class ExplosionAnimationFrames {
  animationsFrames: HTMLImageElement[] = [];
  index = 0;
  counter = 0;
  animationEnded = false;
  textureSize;
  constructor(textureSize: number) {
    this.textureSize = textureSize;
  }
}

