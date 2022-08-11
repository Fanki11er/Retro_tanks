//import brickLeftPartImage from '../../assets/images/Brick_left_part.png';
//import brickRightPartImage from '../../assets/images/Brick_right_part.png';

import brickLeftTopPartImage from '../../assets/images/Bricks/Brick_left_top.png';
import brickLeftBottomPartImage from '../../assets/images/Bricks/Brick_left_bottom.png';
import brickMiddleTopPartImage from '../../assets/images/Bricks/Brick_middle_top.png';
import brickMiddleBottomPartImage from '../../assets/images/Bricks/Brick_middle_bottom.png';
import brickRightTopPartImage from '../../assets/images/Bricks/Brick_right_top.png';
import brickRightBottomPartImage from '../../assets/images/Bricks/Brick_right_bottom.png';
import { BrickWallRecipe } from '../../Types/Types';

export class BrickTextures {
  brickLeftTopPartTexture: HTMLImageElement;
  brickLeftBottomPartTexture: HTMLImageElement;
  brickMiddleTopPartTexture: HTMLImageElement;
  brickMiddleBottomPartTexture: HTMLImageElement;
  brickRightTopPartTexture: HTMLImageElement;
  brickRightBottomPartTexture: HTMLImageElement;

  constructor(
    brickLeftTopPartImageSrc: string,
    brickLeftBottomPartImageSrc: string,
    brickMiddleTopPartImageSrc: string,
    brickMiddleBottomPartImageSrc: string,
    brickRightTopPartImageSrc: string,
    brickRightBottomPartImageSrc: string,
  ) {
    this.brickLeftTopPartTexture = new Image();
    this.brickLeftTopPartTexture.src = brickLeftTopPartImageSrc;
    this.brickLeftBottomPartTexture = new Image();
    this.brickLeftBottomPartTexture.src = brickLeftBottomPartImageSrc;
    this.brickMiddleTopPartTexture = new Image();
    this.brickMiddleTopPartTexture.src = brickMiddleTopPartImageSrc;
    this.brickMiddleBottomPartTexture = new Image();
    this.brickMiddleBottomPartTexture.src = brickMiddleBottomPartImageSrc;
    this.brickRightTopPartTexture = new Image();
    this.brickRightTopPartTexture.src = brickRightTopPartImageSrc;
    this.brickRightBottomPartTexture = new Image();
    this.brickRightBottomPartTexture.src = brickRightBottomPartImageSrc;
  }
}

export const brickTextures = new BrickTextures(
  brickLeftTopPartImage,
  brickLeftBottomPartImage,
  brickMiddleTopPartImage,
  brickMiddleBottomPartImage,
  brickRightTopPartImage,
  brickRightBottomPartImage,
);

export const brickWallRecipe = {
  1: [
    brickTextures.brickRightTopPartTexture,
    brickTextures.brickRightTopPartTexture,
    brickTextures.brickLeftTopPartTexture,
    brickTextures.brickMiddleTopPartTexture,
    brickTextures.brickRightTopPartTexture,
    brickTextures.brickRightTopPartTexture,
    brickTextures.brickLeftTopPartTexture,
    brickTextures.brickMiddleTopPartTexture,
  ],
  2: [
    brickTextures.brickRightBottomPartTexture,
    brickTextures.brickRightBottomPartTexture,
    brickTextures.brickLeftBottomPartTexture,
    brickTextures.brickMiddleBottomPartTexture,
    brickTextures.brickRightBottomPartTexture,
    brickTextures.brickRightBottomPartTexture,
    brickTextures.brickLeftBottomPartTexture,
    brickTextures.brickMiddleBottomPartTexture,
  ],

  3: [
    brickTextures.brickLeftTopPartTexture,
    brickTextures.brickMiddleTopPartTexture,
    brickTextures.brickRightTopPartTexture,
    brickTextures.brickRightTopPartTexture,
    brickTextures.brickLeftTopPartTexture,
    brickTextures.brickMiddleTopPartTexture,
    brickTextures.brickRightTopPartTexture,
    brickTextures.brickRightTopPartTexture,
  ],
  4: [
    brickTextures.brickLeftBottomPartTexture,
    brickTextures.brickMiddleBottomPartTexture,
    brickTextures.brickRightBottomPartTexture,
    brickTextures.brickRightBottomPartTexture,
    brickTextures.brickLeftBottomPartTexture,
    brickTextures.brickMiddleBottomPartTexture,
    brickTextures.brickRightBottomPartTexture,
    brickTextures.brickRightBottomPartTexture,
  ],
} as BrickWallRecipe;

/*
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
*/

