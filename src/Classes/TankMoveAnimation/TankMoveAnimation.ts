import type { Direction } from "../../Types/Types";
import { ChangeDirectionTextures } from "../ChangeDirectionTextures/ChangeDirectionTextures";

export class TankMoveAnimation {
  private index: number = 0;
  private counter: number = 0;
  private textures: ChangeDirectionTextures;
  constructor(textures: ChangeDirectionTextures) {
    this.textures = textures;
  }

  setImage(
    direction: Direction,
    isMoving: boolean,
    deltaTime: number,
    delay: number,
  ) {
    const image = this.switchImage(direction);

    this.counter += deltaTime;
    if (this.counter >= delay && isMoving) {
      this.index += 1;
      this.counter = 0;
    }
    return image;
  }

  setImageSpecialTank(
    direction: Direction,
    isMoving: boolean,
    deltaTime: number,
    delay: number,
    isSpecial: boolean,
  ) {
    const image = this.switchImage(direction);

    this.counter += deltaTime;
    if (isSpecial) {
      if (this.counter >= 0.1 && isMoving) {
        this.index += 1;
        this.counter = 0;
      } else if (this.counter >= 0.1 && !isMoving) {
        this.index += 3;
        this.counter = 0;
      }
    } else {
      if (this.counter >= delay && isMoving) {
        this.index += 2;
        this.counter = 0;
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
      case "Forwards": {
        this.reset(this.textures.forwardDirectionTextures.length);
        return this.textures.forwardDirectionTextures[this.index];
      }
      case "Backwards": {
        this.reset(this.textures.backwardDirectionTextures.length);
        return this.textures.backwardDirectionTextures[this.index];
      }
      case "Left": {
        this.reset(this.textures.leftDirectionTextures.length);
        return this.textures.leftDirectionTextures[this.index];
      }
      case "Right": {
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
