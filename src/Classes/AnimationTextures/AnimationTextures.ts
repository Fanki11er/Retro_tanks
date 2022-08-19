export class AnimationTextures {
  animationTexture: HTMLImageElement[] = [];
  textureSize: number;

  constructor(textureSize: number) {
    this.textureSize = textureSize;
  }

  addTextures(textureSrc: string) {
    const image = new Image();
    image.src = textureSrc;
    this.animationTexture.push(image);
  }
}

