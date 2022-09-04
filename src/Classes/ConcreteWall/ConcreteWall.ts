import { BoardElementType, MaterialType, WallRecipe } from '../../Types/Types';
import { Wall } from '../Wall/Wall';
export class ConcreteWall extends Wall {
  protected materialType: MaterialType;
  constructor(xPos: number, yPos: number, size: number, wallRecipe: WallRecipe, type: BoardElementType, textureSize: number, eagleBorder: boolean) {
    super(xPos, yPos, size, wallRecipe, type, textureSize, eagleBorder);
    this.materialType = 'Concrete';
  }

  protected getRowFromRecipe(row: number, column: number) {
    return this.wallRecipe[1][0];
  }
}

