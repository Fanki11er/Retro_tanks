export abstract class Animation {
  protected index = 0;
  protected counter = 0;
  protected repeats = 1;
  animationEnded = false;
  constructor(public animationFrames: HTMLImageElement[], public textureSize: number) {}
}

