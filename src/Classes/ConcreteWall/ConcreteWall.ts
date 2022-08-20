import { BoardElementType, MaterialType, WallRecipe } from '../../Types/Types';
import { Wall } from '../Wall/Wall';

export class Coordinates {
  x;
  y;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class ConcreteWall extends Wall {
  protected materialType: MaterialType;
  constructor(xPos: number, yPos: number, size: number, wallRecipe: WallRecipe, type: BoardElementType, textureSize: number) {
    super(xPos, yPos, size, wallRecipe, type, textureSize);
    this.materialType = 'Concrete';
  }

  protected getRowFromRecipe(row: number, column: number) {
    return this.wallRecipe[1][0];
  }
}

