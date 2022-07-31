import brickLeftPartImage from '../../assets/images/Brick_left_part.png';
import brickRightPartImage from '../../assets/images/Brick_right_part.png';

export class BrickTextures {
  brickLeftPartTexture: HTMLImageElement;
  brickRightPartTexture: HTMLImageElement;

  constructor(brickLeftPartImageSrc: string, brickRightPartImageSrc: string) {
    this.brickLeftPartTexture = new Image();
    this.brickLeftPartTexture.src = brickLeftPartImageSrc;
    this.brickRightPartTexture = new Image();
    this.brickRightPartTexture.src = brickRightPartImageSrc;
  }
}

export const brickTextures = new BrickTextures(brickLeftPartImage, brickRightPartImage);

