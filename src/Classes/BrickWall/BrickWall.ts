import { BrickTextures } from '../../Textures/BrickWall/BrickWallTexture';
import { BoardElementType, StaticDrawable } from '../../Types/Types';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';

export class Coordinates {
  x;
  y;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class BrickWall implements StaticDrawable {
  xPos;
  yPos;
  width;
  height;
  textures;
  type;
  coordinates: Coordinates[];
  collisionZone;

  constructor(xPos: number, yPos: number, size: number, brickTextures: BrickTextures, type: BoardElementType) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = type === 'Horizontally' || type === 'Full' ? size : size / 2;
    this.height = type === 'Vertically' || type === 'Full' ? size : size / 2;
    this.textures = brickTextures;
    this.type = type;
    this.coordinates = [];
    this.collisionZone = new ElementCollisionZone({ x: xPos, y: yPos }, this.width, this.height);
    this.createArray(type);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    let even = false;
    for (let i = 0; i < this.coordinates.length; i++) {
      if (i % this.getParts() === 0) {
        even = !even;
      }

      if (even) {
        ctx.drawImage(
          i % 2 !== 0 ? this.textures.brickLeftPartTexture : this.textures.brickRightPartTexture,
          this.coordinates[i].x,
          this.coordinates[i].y,
        );
      } else {
        ctx.drawImage(
          i % 2 !== 0 ? this.textures.brickRightPartTexture : this.textures.brickLeftPartTexture,
          this.coordinates[i].x,
          this.coordinates[i].y,
        );
      }
    }
  }

  createArray(type: BoardElementType) {
    switch (type) {
      case 'Full': {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const x = this.xPos + j * 6;
            const y = this.yPos + i * 6;
            this.coordinates.push(new Coordinates(x, y));
          }
        }
        break;
      }
      case 'Vertically': {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 2; j++) {
            const x = this.xPos + j * 6;
            const y = this.yPos + i * 6;
            this.coordinates.push(new Coordinates(x, y));
          }
        }
        break;
      }

      case 'Horizontally': {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 4; j++) {
            const x = this.xPos + j * 6;
            const y = this.yPos + i * 6;
            this.coordinates.push(new Coordinates(x, y));
          }
        }
        break;
      }
    }
  }

  getParts() {
    if (this.type === 'Full' || this.type === 'Horizontally') {
      return 4;
    }
    return 2;
  }

  getCollisionZone() {
    return this.collisionZone.getCollisionZone();
  }
}

