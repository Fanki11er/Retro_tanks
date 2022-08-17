import indestructibleAnimationSmallImage from '../../assets/images/Indestructible/Indestructible_small.png';
import indestructibleAnimationMediumImage from '../../assets/images/Indestructible/Indestructible_medium.png';

export class IndestructibleTextures {
  textures: HTMLImageElement[] = [];

  constructor(indestructibleAnimationImage1Src: string, indestructibleAnimationImage2Src: string) {
    this.textures.push(new Image());
    this.textures[0].src = indestructibleAnimationImage1Src;
    this.textures.push(new Image());
    this.textures[1].src = indestructibleAnimationImage2Src;
  }
}

export const indestructibleTextures = new IndestructibleTextures(indestructibleAnimationSmallImage, indestructibleAnimationMediumImage);

