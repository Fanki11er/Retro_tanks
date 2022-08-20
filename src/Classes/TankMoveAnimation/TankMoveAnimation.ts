import { Direction } from '../../Types/Types';
import { ChangeDirectionTextures } from '../ChangeDirectionTextures/ChangeDirectionTextures';

export class TankMoveAnimation {
  private index: number = 0;
  private counter: number = 0;
  private textures: ChangeDirectionTextures;
  constructor(textures: ChangeDirectionTextures) {
    this.textures = textures;
  }

  setImage(direction: Direction, isMoving: boolean, delay: number) {
    let image;
    switch (direction) {
      case 'Forwards': {
        this.reset(this.textures.forwardDirectionTextures.length);
        image = this.textures.forwardDirectionTextures[this.index];
        break;
      }
      case 'Backwards': {
        this.reset(this.textures.backwardDirectionTextures.length);
        image = this.textures.backwardDirectionTextures[this.index];
        break;
      }
      case 'Left': {
        this.reset(this.textures.leftDirectionTextures.length);
        image = this.textures.leftDirectionTextures[this.index];
        break;
      }
      case 'Right': {
        this.reset(this.textures.rightDirectionTextures.length);
        image = this.textures.rightDirectionTextures[this.index];
        break;
      }
      default: {
        image = new Image();
        break;
      }
    }
    this.counter += 1;
    if (this.counter % delay === 0 && isMoving) {
      this.index += 1;
    }
    return image;
  }

  private reset(length: number) {
    if (this.index >= length) {
      this.index = 0;
    }
  }
}

