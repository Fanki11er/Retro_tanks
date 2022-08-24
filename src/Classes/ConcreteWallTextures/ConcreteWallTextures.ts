import ConcreteWallImage from '../../assets/images/Concrete/Concrete_wall_texture.png';

import { WallRecipe } from '../../Types/Types';

class ConcreteTextures {
  elementTexture: HTMLImageElement;

  constructor(elementImageSrc: string) {
    this.elementTexture = new Image();
    this.elementTexture.src = elementImageSrc;
  }
}

const concreteTextures = new ConcreteTextures(ConcreteWallImage);

export const concreteWallRecipe = {
  textureSize: 12,
  elementSize: 24,
  1: [concreteTextures.elementTexture],
} as WallRecipe;

