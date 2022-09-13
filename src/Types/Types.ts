import { ChangeDirectionTextures } from '../Classes/ChangeDirectionTextures/ChangeDirectionTextures';

export type Direction = 'Forwards' | 'Left' | 'Right' | 'Backwards' | 'None';

export type BoardElementType = 'Full' | 'Horizontally' | 'Vertically';

export type MaterialType = 'Brick' | 'Concrete';

export type TankTypes = 'Small' | 'Fast' | 'Medium';

export type Owner = 'player1' | 'player2' | '';

export type FindingsTypes = 'Tank' | 'Grenade' | 'Helmet' | 'Stopwatch' | 'Shovel' | 'Star';
export class Coordinates {
  x;
  y;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export type CollisionZone = {
  A: Coordinates;
  B: Coordinates;
  C: Coordinates;
  D: Coordinates;
};

export type DestroyedBy = {
  destroyedBy: Owner;
  type: TankTypes;
};

export interface StaticDrawable {
  draw: (ctx: CanvasRenderingContext2D) => void;
  getCollisionZone: () => CollisionZone;
  getInnerCoordinates: () => WallCoordinates[];
  getTextureSize: () => number;
  id: string;
  changed: boolean;
  isDestroyed: boolean;
  processHit: (ammunitionType: AmmunitionType, collisionZone: CollisionZone, yPos: number) => string;
  getPrecisionCollisionPlace: (collisionZone: CollisionZone, direction: Direction) => WallCoordinates;
  getIsEagleBorder: () => boolean;
}

export type AmmunitionType = 'Standard' | 'Heavy';
export type WallCoordinates = Coordinates | null;

export type WallRecipe = {
  textureSize: number;
  elementSize: number;
  [k: number]: HTMLImageElement[];
};

export type LevelRecipe = {
  staticObjectsRecipe: StaticObjectsRecipe[];
  eagle: EagleRecipe;
  enemyTanksList: TankTypes[];
};

export type StaticObjectsRecipe = {
  material: MaterialType;
  xPos: number;
  yPos: number;
  layoutType: BoardElementType;
  eagleBorder: boolean;
};

export type EagleRecipe = {
  xPos: number;
  yPos: number;
  size: number;
};

export type TankTypesTextures = {
  Small: ChangeDirectionTextures;
  Medium: ChangeDirectionTextures;
  Fast: ChangeDirectionTextures;
};

