export abstract class Animation {
  protected index = 0;
  protected counter = 0;
  protected repeats = 1;
  textureSize;
  animationsFrames: HTMLImageElement[];
  animationEnded = false;
  constructor(animationFrames: HTMLImageElement[], textureSize: number) {
    this.animationsFrames = animationFrames;
    this.textureSize = textureSize;
  }
}

