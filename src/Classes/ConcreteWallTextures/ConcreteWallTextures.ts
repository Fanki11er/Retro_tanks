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
  1: [concreteTextures.elementTexture],
  2: [],

  3: [],
  4: [],
} as WallRecipe;

