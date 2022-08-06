import { v4 as uuidv4 } from 'uuid';
import { BrickTextures } from '../../Textures/BrickWall/BrickWallTexture';
import { AmmunitionType, BoardElementType, CollisionZone, StaticDrawable, WallCoordinates } from '../../Types/Types';
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
  public id;
  private xPos;
  private yPos;
  private width;
  private height;
  private textures;
  private type;
  private coordinates: WallCoordinates[];
  private collisionZone;
  private damaged = false;
  public changed = false;

  constructor(xPos: number, yPos: number, size: number, brickTextures: BrickTextures, type: BoardElementType) {
    this.id = uuidv4();
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
        this.coordinates[i] &&
          ctx.drawImage(
            i % 2 !== 0 ? this.textures.brickLeftPartTexture : this.textures.brickRightPartTexture,
            this.coordinates[i]!.x,
            this.coordinates[i]!.y,
          );
      } else {
        this.coordinates[i] &&
          ctx.drawImage(
            i % 2 !== 0 ? this.textures.brickRightPartTexture : this.textures.brickLeftPartTexture,
            this.coordinates[i]!.x,
            this.coordinates[i]!.y,
          );
      }
    }
  }

  private createArray(type: BoardElementType) {
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

  private getParts() {
    if (this.type === 'Full' || this.type === 'Horizontally') {
      return 4;
    }
    return 2;
  }

  public getCollisionZone() {
    return this.collisionZone.getCollisionZone();
  }

  public processHit(ammunitionType: AmmunitionType, collisionZone: CollisionZone) {
    return this.deleteParts(collisionZone);
  }

  private deleteParts(collisionZone: CollisionZone) {
    let hits = false;
    for (let i = 0; i < this.coordinates.length; i++) {
      if (
        this.coordinates[i] &&
        this.coordinates[i]!.x < collisionZone.B.x &&
        this.coordinates[i]!.x + 6 > collisionZone.A.x &&
        this.coordinates[i]!.y < collisionZone.C.y &&
        this.coordinates[i]!.y + 6 > collisionZone.A.y
      ) {
        this.coordinates[i] = null;
        hits = true;
      }
    }
    if (hits) {
      this.changed = true;
      // todo Change size of collision zone after delete elements
      return true;
    }
    return false;
  }
}

