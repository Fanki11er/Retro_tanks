import { v4 as uuidv4 } from 'uuid';
import { brickWallRecipe } from '../../Textures/BrickWall/BrickWallTexture';
import { AmmunitionType, BoardElementType, BrickWallRecipe, CollisionZone, Direction, StaticDrawable, WallCoordinates } from '../../Types/Types';
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
  public changed = false;

  constructor(xPos: number, yPos: number, size: number, brickWallRecipe: BrickWallRecipe, type: BoardElementType) {
    this.id = uuidv4();
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = type === 'Horizontally' || type === 'Full' ? size : size / 2;
    this.height = type === 'Vertically' || type === 'Full' ? size : size / 2;
    this.textures = brickWallRecipe;
    this.type = type;
    this.coordinates = [];
    this.collisionZone = new ElementCollisionZone({ x: xPos, y: yPos }, this.width, this.height);
    this.createArray(type, 8, 8, 3);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    let row = 1;
    let column = 1;
    const parts = this.getParts();
    for (let i = 0; i < this.coordinates.length; i++) {
      if (this.coordinates[i]) {
        ctx.drawImage(this.getRowFromRecipe(row, column - 1), this.coordinates[i]!.x, this.coordinates[i]!.y);
        column++;
        if (column % (parts + 1) === 0) {
          column = 1;
        }
        if ((i + 1) % parts === 0) {
          row++;
        }
      } else {
        column++;
        if (column % (parts + 1) === 0) {
          column = 1;
        }
        if ((i + 1) % parts === 0) {
          row++;
        }
      }
    }
  }

  private createArray(type: BoardElementType, rows: number, columns: number, textureSize: number) {
    switch (type) {
      case 'Full': {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            const x = this.xPos + j * textureSize;
            const y = this.yPos + i * textureSize;
            this.coordinates.push(new Coordinates(x, y));
          }
        }
        break;
      }
      case 'Vertically': {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns / 2; j++) {
            const x = this.xPos + j * 3;
            const y = this.yPos + i * 3;
            this.coordinates.push(new Coordinates(x, y));
          }
        }
        break;
      }

      case 'Horizontally': {
        for (let i = 0; i < rows / 2; i++) {
          for (let j = 0; j < columns; j++) {
            const x = this.xPos + j * 3;
            const y = this.yPos + i * 3;
            this.coordinates.push(new Coordinates(x, y));
          }
        }
        break;
      }
    }
  }

  private getParts() {
    if (this.type === 'Full' || this.type === 'Horizontally') {
      return 8;
    }
    return 4;
  }

  public getCollisionZone() {
    return this.collisionZone.getCollisionZone();
  }

  public processHit(ammunitionType: AmmunitionType, collisionZone: CollisionZone, yPos: number) {
    return this.deleteParts(collisionZone);
  }

  private deleteParts(collisionZone: CollisionZone) {
    let hits = false;
    for (let i = 0; i < this.coordinates.length; i++) {
      if (
        this.coordinates[i] &&
        this.coordinates[i]!.x <= collisionZone.B.x &&
        this.coordinates[i]!.x + 3 >= collisionZone.A.x &&
        this.coordinates[i]!.y <= collisionZone.C.y &&
        this.coordinates[i]!.y + 3 >= collisionZone.A.y
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

  private getRowFromRecipe(row: number, column: number) {
    if (row === 1 || row === 5) {
      return brickWallRecipe[1][column];
    }
    if (row === 2 || row === 6) {
      return brickWallRecipe[2][column];
    }
    if (row === 3 || row === 7) {
      return brickWallRecipe[3][column];
    }
    if (row === 4 || row === 8) {
      return brickWallRecipe[4][column];
    }
    return brickWallRecipe[1][0];
  }

  public getPrecisionHitPlace(collisionZone: CollisionZone, direction: Direction) {
    for (let i = 0; i < this.coordinates.length; i++) {
      if (
        this.coordinates[i] &&
        this.coordinates[i]!.x <= collisionZone.B.x &&
        this.coordinates[i]!.x + 3 >= collisionZone.A.x &&
        this.coordinates[i]!.y <= collisionZone.C.y &&
        this.coordinates[i]!.y + 3 >= collisionZone.A.y
      ) {
        if (direction === 'Forwards') {
          return { x: collisionZone.A.x + 1, y: collisionZone.A.y };
        }
        if (direction === 'Backwards') {
          return { x: collisionZone.C.x + 1, y: collisionZone.C.y };
        }

        if (direction === 'Left') {
          return { x: collisionZone.A.x, y: collisionZone.A.y + 1 };
        }
        if (direction === 'Right') {
          return { x: collisionZone.B.x, y: collisionZone.B.y + 1 };
        }
      }
    }
    return null;
  }

  public getPrecisionCollisionPlace(collisionZone: CollisionZone, direction: Direction) {
    if (direction === 'Forwards') {
      for (let i = 0; i < this.coordinates.length; i++) {
        if (
          this.coordinates[i] &&
          this.coordinates[i]!.x + 0.2 < collisionZone.B.x &&
          this.coordinates[i]!.x + 3 - 0.2 > collisionZone.A.x &&
          this.coordinates[i]!.y <= collisionZone.C.y &&
          this.coordinates[i]!.y + 3 >= collisionZone.A.y
        ) {
          return { x: collisionZone.A.x, y: collisionZone.A.y };
        }
      }
    }
    if (direction === 'Backwards') {
      for (let i = 0; i < this.coordinates.length; i++) {
        if (
          this.coordinates[i] &&
          this.coordinates[i]!.x + 0.2 < collisionZone.B.x &&
          this.coordinates[i]!.x + 3 - 0.2 > collisionZone.A.x &&
          this.coordinates[i]!.y <= collisionZone.C.y &&
          this.coordinates[i]!.y + 3 >= collisionZone.A.y
        ) {
          return { x: collisionZone.C.x, y: collisionZone.C.y };
        }
      }
    }
    if (direction === 'Left') {
      for (let i = 0; i < this.coordinates.length; i++) {
        if (
          this.coordinates[i] &&
          this.coordinates[i]!.x <= collisionZone.B.x &&
          this.coordinates[i]!.x + 3 >= collisionZone.A.x &&
          this.coordinates[i]!.y + 0.2 < collisionZone.C.y &&
          this.coordinates[i]!.y + 3 - 0.2 > collisionZone.A.y
        ) {
          return { x: collisionZone.A.x, y: collisionZone.A.y };
        }
      }
    }
    if (direction === 'Right') {
      for (let i = 0; i < this.coordinates.length; i++) {
        if (
          this.coordinates[i] &&
          this.coordinates[i]!.x <= collisionZone.B.x &&
          this.coordinates[i]!.x + 3 >= collisionZone.A.x &&
          this.coordinates[i]!.y + 0.2 < collisionZone.C.y &&
          this.coordinates[i]!.y + 3 - 0.2 > collisionZone.A.y
        ) {
          return { x: collisionZone.B.x, y: collisionZone.B.y };
        }
      }
    }
    return null;
  }
}

