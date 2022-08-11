import { Coordinates } from '../Classes/BrickWall/BrickWall';

export type Direction = 'Forwards' | 'Left' | 'Right' | 'Backwards' | 'None';

export type BoardElementType = 'Full' | 'Horizontally' | 'Vertically';

export type CollisionZone = {
  A: Coordinates;
  B: Coordinates;
  C: Coordinates;
  D: Coordinates;
};

export interface StaticDrawable {
  draw: (ctx: CanvasRenderingContext2D) => void;
  getCollisionZone: () => CollisionZone;
  id: string;
  changed: boolean;
  processHit: (ammunitionType: AmmunitionType, collisionZone: CollisionZone, yPos: number) => boolean;
  getPrecisionHitPlace: (collisionZone: CollisionZone, direction: Direction) => WallCoordinates;
}

export type AmmunitionType = 'Standard' | 'Heavy';
export type WallCoordinates = Coordinates | null;

export type BrickWallRecipe = {
  1: HTMLImageElement[];
  2: HTMLImageElement[];
  3: HTMLImageElement[];
  4: HTMLImageElement[];
};

