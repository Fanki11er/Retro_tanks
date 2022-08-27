import { Direction } from '../../Types/Types';

export class ChangeDirectionTextures {
  forwardDirectionTextures: HTMLImageElement[] = [];
  backwardDirectionTextures: HTMLImageElement[] = [];
  leftDirectionTextures: HTMLImageElement[] = [];
  rightDirectionTextures: HTMLImageElement[] = [];

  constructor(public textureSize: number) {}

  addTextures(textureSrc: string, direction: Direction) {
    const image = new Image();
    image.src = textureSrc;

    switch (direction) {
      case 'Forwards': {
        this.forwardDirectionTextures.push(image);
        break;
      }
      case 'Backwards': {
        this.backwardDirectionTextures.push(image);
        break;
      }
      case 'Left': {
        this.leftDirectionTextures.push(image);
        break;
      }
      case 'Right': {
        this.rightDirectionTextures.push(image);
        break;
      }
    }
  }
}

