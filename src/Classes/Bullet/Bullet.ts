import { BulletTextures } from '../../Textures/BulletTextures/BulletTextures';
import { Direction, StaticDrawable } from '../../Types/Types';

export class Bullet {
  xPos;
  yPos;
  width;
  height;
  textures: BulletTextures;
  direction;
  image: HTMLImageElement | null = null;
  staticObjects;
  // Todo: Add Collision zone

  constructor(
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    direction: Direction,
    textures: BulletTextures,
    staticObjects: StaticDrawable[],
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.textures = textures;
    this.direction = direction;
    this.setImageForDirection();
    this.staticObjects = staticObjects;
  }

  public draw(context: CanvasRenderingContext2D) {
    this.image && context.drawImage(this.image, this.xPos, this.yPos);
  }

  setImageForDirection() {
    switch (this.direction) {
      case 'Forwards': {
        this.image = this.textures.upDirectionTexture;
        break;
      }
      case 'Backwards': {
        this.image = this.textures.downDirectionTexture;
        break;
      }
      case 'Left': {
        this.image = this.textures.leftDirectionTexture;
        break;
      }
      case 'Right': {
        this.image = this.textures.rightDirectionTexture;
      }
    }
  }
}

