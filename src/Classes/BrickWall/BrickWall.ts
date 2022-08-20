import { BoardElementType, MaterialType, WallRecipe } from '../../Types/Types';
import { Wall } from '../Wall/Wall';
export class BrickWall extends Wall {
  protected materialType: MaterialType;
  constructor(xPos: number, yPos: number, size: number, wallRecipe: WallRecipe, type: BoardElementType, textureSize: number) {
    super(xPos, yPos, size, wallRecipe, type, textureSize);
    this.materialType = 'Brick';
  }

  protected getRowFromRecipe(row: number, column: number) {
    if (row === 1 || row === 5) {
      return this.wallRecipe[1][column];
    }
    if (row === 2 || row === 6) {
      return this.wallRecipe[2][column];
    }
    if (row === 3 || row === 7) {
      return this.wallRecipe[3][column];
    }
    if (row === 4 || row === 8) {
      return this.wallRecipe[4][column];
    }
    return this.wallRecipe[1][0];
  }
}

