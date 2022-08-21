import { v4 as uuidv4 } from 'uuid';
import {
  AmmunitionType,
  BoardElementType,
  WallRecipe,
  CollisionZone,
  Direction,
  StaticDrawable,
  WallCoordinates,
  MaterialType,
  Coordinates,
} from '../../Types/Types';
import { ElementCollisionZone } from '../ElementCollisionZone/ElementCollisionZone';

export abstract class Wall implements StaticDrawable {
  public id;
  protected xPos;
  protected yPos;
  protected width;
  protected height;
  protected wallRecipe;
  protected type;
  protected abstract materialType: MaterialType;
  protected coordinates: WallCoordinates[];
  protected collisionZone;
  public changed = false;
  protected textureSize;
  protected numberOfElements;
  public isDestroyed = false;

  constructor(xPos: number, yPos: number, size: number, wallRecipe: WallRecipe, type: BoardElementType, textureSize: number) {
    this.id = uuidv4();
    this.xPos = xPos;
    this.yPos = yPos;
    this.type = type;
    this.width = this.type === 'Horizontally' || this.type === 'Full' ? size : size / 2;
    this.height = this.type === 'Vertically' || this.type === 'Full' ? size : size / 2;
    this.wallRecipe = wallRecipe;
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

  protected createArray(rows: number, columns: number, textureSize: number) {
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

  protected getParts() {
    return this.width / this.textureSize;
  }

  public getCollisionZone() {
    return this.collisionZone.getCollisionZone();
  }

  public processHit(ammunitionType: AmmunitionType, collisionZone: CollisionZone, yPos: number) {
    if ((this.materialType === 'Brick' && ammunitionType === 'Standard') || ammunitionType === 'Heavy') {
      this.deleteParts(collisionZone);
    }
    if (this.materialType === 'Concrete' && ammunitionType === 'Heavy') {
      this.deleteParts(collisionZone);
    }

    if (this.numberOfElements <= 0) {
      this.isDestroyed = true;
      return this.id;
    }
    return '';
  }

  protected deleteParts(collisionZone: CollisionZone) {
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

  /*public getPrecisionHitPlace(collisionZone: CollisionZone, direction: Direction) {
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
  }*/

  getInnerCoordinates() {
    return this.coordinates;
  }
  getTextureSize() {
    return this.textureSize;
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

  protected abstract getRowFromRecipe(row: number, column: number): HTMLImageElement;
}

