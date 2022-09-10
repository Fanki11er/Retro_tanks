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
    let image = this.switchImage(direction);

    this.counter += 1;
    if (this.counter % delay === 0 && isMoving) {
      this.index += 1;
    }
    return image;
  }

  setImageSpecialTank(direction: Direction, isMoving: boolean, delay: number, isSpecial: boolean) {
    let image = this.switchImage(direction);

    this.counter += 1;
    if (isSpecial) {
      if (this.counter % delay === 0 && isMoving) {
        this.index += 1;
      } else if (this.counter % delay === 0 && !isMoving) {
        this.index += 3;
      }
    } else {
      if (this.counter % delay === 0 && isMoving) {
        this.index += 2;
      }
    }
    return image;
  }

  private reset(length: number) {
    if (this.index >= length) {
      this.index = 0;
    }
  }

  private switchImage(direction: Direction) {
    switch (direction) {
      case 'Forwards': {
        this.reset(this.textures.forwardDirectionTextures.length);
        return this.textures.forwardDirectionTextures[this.index];
      }
      case 'Backwards': {
        this.reset(this.textures.backwardDirectionTextures.length);
        return this.textures.backwardDirectionTextures[this.index];
      }
      case 'Left': {
        this.reset(this.textures.leftDirectionTextures.length);
        return this.textures.leftDirectionTextures[this.index];
      }
      case 'Right': {
        this.reset(this.textures.rightDirectionTextures.length);
        return this.textures.rightDirectionTextures[this.index];
      }
      default: {
        return new Image();
      }
    }
  }

  public changeTextures(textures: ChangeDirectionTextures) {
    this.textures = textures;
  }
}

