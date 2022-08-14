import { v4 as uuidv4 } from 'uuid';
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
  private brickWallRecipe;
  private type;
  private coordinates: WallCoordinates[];
  private collisionZone;
  public changed = false;
  private textureSize;
  private numberOfElements;
  public isDestroyed = false;

  constructor(xPos: number, yPos: number, size: number, brickWallRecipe: BrickWallRecipe, type: BoardElementType, textureSize: number) {
    this.id = uuidv4();
    this.xPos = xPos;
    this.yPos = yPos;
    this.type = type;
    this.width = this.type === 'Horizontally' || this.type === 'Full' ? size : size / 2;
    this.height = this.type === 'Vertically' || this.type === 'Full' ? size : size / 2;
    this.brickWallRecipe = brickWallRecipe;
    this.coordinates = [];
    this.collisionZone = new ElementCollisionZone({ x: xPos, y: yPos }, this.width, this.height);
    this.textureSize = textureSize;
    this.numberOfElements = ((this.width / textureSize) * this.height) / textureSize;
    this.createArray(size / textureSize, size / textureSize, textureSize);
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

  private createArray(rows: number, columns: number, textureSize: number) {
    switch (this.type) {
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
            const x = this.xPos + j * textureSize;
            const y = this.yPos + i * textureSize;
            this.coordinates.push(new Coordinates(x, y));
          }
        }
        break;
      }

      case 'Horizontally': {
        for (let i = 0; i < rows / 2; i++) {
          for (let j = 0; j < columns; j++) {
            const x = this.xPos + j * textureSize;
            const y = this.yPos + i * textureSize;
            this.coordinates.push(new Coordinates(x, y));
          }
        }
        break;
      }
    }
  }

  private getParts() {
    return this.width / this.textureSize;
  }

  public getCollisionZone() {
    return this.collisionZone.getCollisionZone();
  }

  public processHit(ammunitionType: AmmunitionType, collisionZone: CollisionZone, yPos: number) {
    this.deleteParts(collisionZone);
    if (this.numberOfElements <= 0) {
      this.isDestroyed = true;
      return this.id;
    }
    return '';
  }

  private deleteParts(collisionZone: CollisionZone) {
    let hits = false;
    for (let i = 0; i < this.coordinates.length; i++) {
      if (
        this.coordinates[i] &&
        this.coordinates[i]!.x <= collisionZone.B.x &&
        this.coordinates[i]!.x + this.textureSize >= collisionZone.A.x &&
        this.coordinates[i]!.y <= collisionZone.C.y &&
        this.coordinates[i]!.y + this.textureSize >= collisionZone.A.y
      ) {
        this.coordinates[i] = null;
        this.numberOfElements -= 1;
        hits = true;
      }
    }
    if (hits) {
      this.changed = true;
    }
  }

  private getRowFromRecipe(row: number, column: number) {
    if (row === 1 || row === 5) {
      return this.brickWallRecipe[1][column];
    }
    if (row === 2 || row === 6) {
      return this.brickWallRecipe[2][column];
    }
    if (row === 3 || row === 7) {
      return this.brickWallRecipe[3][column];
    }
    if (row === 4 || row === 8) {
      return this.brickWallRecipe[4][column];
    }
    return this.brickWallRecipe[1][0];
  }

  public getPrecisionHitPlace(collisionZone: CollisionZone, direction: Direction) {
    for (let i = 0; i < this.coordinates.length; i++) {
      if (
        this.coordinates[i] &&
        this.coordinates[i]!.x <= collisionZone.B.x &&
        this.coordinates[i]!.x + this.textureSize >= collisionZone.A.x &&
        this.coordinates[i]!.y <= collisionZone.C.y &&
        this.coordinates[i]!.y + this.textureSize >= collisionZone.A.y
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
          this.coordinates[i]!.x + this.textureSize - 0.2 > collisionZone.A.x &&
          this.coordinates[i]!.y <= collisionZone.C.y &&
          this.coordinates[i]!.y + this.textureSize >= collisionZone.A.y
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
          this.coordinates[i]!.x + this.textureSize - 0.2 > collisionZone.A.x &&
          this.coordinates[i]!.y <= collisionZone.C.y &&
          this.coordinates[i]!.y + this.textureSize >= collisionZone.A.y
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
          this.coordinates[i]!.x + this.textureSize >= collisionZone.A.x &&
          this.coordinates[i]!.y + 0.2 < collisionZone.C.y &&
          this.coordinates[i]!.y + this.textureSize - 0.2 > collisionZone.A.y
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
          this.coordinates[i]!.x + this.textureSize >= collisionZone.A.x &&
          this.coordinates[i]!.y + 0.2 < collisionZone.C.y &&
          this.coordinates[i]!.y + this.textureSize - 0.2 > collisionZone.A.y
        ) {
          return { x: collisionZone.B.x, y: collisionZone.B.y };
        }
      }
    }
    return null;
  }
}

